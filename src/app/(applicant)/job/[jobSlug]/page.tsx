"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAllApplications, saveApplicantData } from "@/app/actions/applicant";
import UploadResume from "@/components/UploadResume";
import { useParams } from "next/navigation";
import { getAllJobs } from "@/app/actions";
import { toast } from "sonner"; // Add this import

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  currentSalary: z.number().optional(),
  receiveNotifications: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function JobApplicationForm() {
  const { jobSlug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const result = await getAllApplications();
      console.log(result);
    };

    fetchApplications();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleUploadSuccess = (url: string) => {
    setResumeUrl(url);
    setUploadError(null);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setResumeUrl(null);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!resumeUrl) {
        throw new Error("Please upload a resume before submitting");
      }

      const applicantData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        resumeUrl: resumeUrl,
        currentSalary: data.currentSalary,
        receiveNotifications: data.receiveNotifications,
        jobApplicationId: Number(jobSlug),
      };

      const result = await saveApplicantData(applicantData);

      if (result.success) {
        // Show success message using Sonner with a green checkbox
        toast.success("Application submitted successfully!", {
          description:
            "We will review your application and get back to you soon.",
          position: "top-right",
          icon: "✅", // Green checkbox icon
        });
        console.log("Application submitted successfully", result.applicant);
      } else {
        setSubmitError("Failed to submit application. Please try again.");
        console.error("Submission errors:", result.errors || result.error);
      }
    } catch (error) {
      setSubmitError("Failed to submit application. Please try again.");
      console.error("Submission error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className="input input-bordered"
            autoComplete="off"
          />
          {errors.firstName && (
            <span className="text-error">{errors.firstName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className="input input-bordered"
            autoComplete="off"
          />
          {errors.lastName && (
            <span className="text-error">{errors.lastName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="input input-bordered"
            autoComplete="off"
          />
          {errors.email && (
            <span className="text-error">{errors.email.message}</span>
          )}
        </div>

        <UploadResume
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
        {resumeUrl && (
          <p className="text-success">Resume uploaded successfully!</p>
        )}
        {uploadError && <p className="text-error">{uploadError}</p>}

        <div className="form-control">
          <label className="label" htmlFor="currentSalary">
            <span className="label-text">Current Salary (optional)</span>
          </label>
          <input
            type="number"
            id="currentSalary"
            {...register("currentSalary", { valueAsNumber: true })}
            className="input input-bordered"
            autoComplete="off"
          />
          {errors.currentSalary && (
            <span className="text-error">{errors.currentSalary.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">
              Receive notifications about my application
            </span>
            <input
              type="checkbox"
              {...register("receiveNotifications")}
              className="checkbox"
            />
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting || !resumeUrl}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>

        {submitError && <p className="text-error">{submitError}</p>}
      </form>
    </div>
  );
}
