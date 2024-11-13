"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UploadResume from "@/components/UploadResume";
import { saveApplicantData } from "@/app/actions/applicant";

// Validation schema
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  currentCtc: z
    .string()
    .min(1, "Current CTC is required")
    .regex(/^\d+$/, "Please enter a valid number")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 0, "CTC cannot be negative")
    .refine((val) => val <= 100000000, "Please enter a reasonable amount"),
  resume: z.string().min(1, "Resume is required"),
  receiveEmails: z.boolean().optional(),
  answers: z
    .array(z.string().min(50, "Answer must be at least 50 characters long"))
    .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  questions: string[];
  jobId: number; // Add jobId prop
}

export function JobApplicationForm({
  questions,
  jobId,
}: JobApplicationFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      receiveEmails: false,
      answers: questions.map(() => ""),
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Submitting your application...");

      // Prepare data for submission
      const submissionData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        resumeUrl: data.resume,
        currentSalary: parseInt(data.currentCtc.toString()),
        receiveNotifications: data.receiveEmails || false,
        jobApplicationId: jobId,
        answers: data.answers || [],
      };

      const result = await saveApplicantData(submissionData);
      console.log(result);
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success && result.applicant) {
        // Show success toast
        toast.success("Application submitted successfully!");
        // Redirect to success page
        router.push(`/application-success/${result.applicant.id}`);
      } else {
        // Show error toast with specific message if available
        toast.error(result.error || "Failed to submit application");
      }
    } catch (error) {
      // Show error toast
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Application submission error:", error);
    }
  };

  const handleUploadSuccess = (url: string) => {
    setValue("resume", url, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success("Resume uploaded successfully!");
  };

  const handleUploadError = (error: string) => {
    setValue("resume", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.error(error || "Failed to upload resume");
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Apply for this position</h2>
        <p className="text-base-content/70">
          Please fill out the form below to submit your application
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.lastName ? "input-error" : ""
                }`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastName.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                className={`input input-bordered w-full ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.phone.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Current CTC (per annum)</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.currentCtc ? "input-error" : ""
                }`}
                placeholder="Enter amount in USD"
                {...register("currentCtc")}
              />
              {errors.currentCtc && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.currentCtc.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control">
            <UploadResume
              title="Resume"
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              allowedFileTypes={["application/pdf"]}
              acceptedFileTypes=".pdf"
              maxSizeInMB={10}
              sizeText="PDF up to 10MB"
              error={errors.resume?.message}
            />
          </div>

          {questions.slice(0, 5).map((question, index) => (
            <div key={index} className="form-control">
              <label className="label">
                <span className="label-text">{question}</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24 ${
                  errors.answers?.[index] ? "textarea-error" : ""
                }`}
                placeholder="Your answer (minimum 50 characters)..."
                {...register(`answers.${index}`)}
              />
              {errors.answers?.[index] && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.answers[index]?.message}
                  </span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">
                  Characters: {watch(`answers.${index}`)?.length || 0}/50
                </span>
              </label>
            </div>
          ))}

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register("receiveEmails")}
              />
              <span className="label-text">
                Receive job application status emails
              </span>
            </label>
          </div>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
