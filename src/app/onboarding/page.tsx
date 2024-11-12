"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveCompanyData } from "@/app/actions/company";
import {
  Building2,
  Users,
  Globe,
  PartyPopper,
  Image as ImageIcon,
  Upload,
  CheckCircle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import UploadResume from "@/components/UploadResume";
import Link from "next/link";
import { toast } from "sonner";

const OnboardingSuccess = ({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("/jobs");
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center p-12">
            {/* Success Animation */}
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6 animate-bounce">
              <PartyPopper className="w-10 h-10 text-success" />
            </div>

            <h1 className="text-4xl font-bold mb-2">
              Welcome to TrackWise AI!
            </h1>

            <p className="text-lg text-base-content/70 mb-8 opacity-80">
              Your company profile has been successfully set up
            </p>

            {/* Next Steps */}
            <div className="space-y-4 w-full mb-8">
              <h3 className="font-bold text-lg relative z-10">What's Next?</h3>

              {/* Confetti Effect - Positioned below the text */}
              <div className="relative h-1">
                <div className="absolute inset-x-0 flex items-center justify-center">
                  <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                </div>
                <div className="absolute inset-x-0 flex items-center justify-center">
                  <div
                    className="w-1 h-1 bg-success rounded-full animate-ping"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <div className="absolute inset-x-0 flex items-center justify-center">
                  <div
                    className="w-1 h-1 bg-accent rounded-full animate-ping"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>

              <ul className="steps steps-horizontal w-full text-sm text-base-content/60">
                <li className="step step-success">Setup Profile</li>
                <li className="step step-success">Post Jobs</li>
                <li className="step">Get Applications</li>
                <li className="step">Review</li>
              </ul>
            </div>

            {/* Redirect Notice */}
            <p className="text-base-content/70 flex items-center justify-center gap-2 mb-6">
              <span>Redirecting to jobs page in</span>
              <span className="countdown font-mono text-lg">
                <span style={{ "--value": countdown }}></span>
              </span>
              <span>seconds</span>
            </p>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <Link href="/jobs/new" className="btn btn-primary btn-lg gap-2">
                Post Your First Job
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Split the schema into steps
const step1Schema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companySize: z.enum([
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ]),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

const step2Schema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  foundedYear: z
    .number()
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

const step3Schema = z.object({
  logo: z.string().url("Company logo is required"),
  website: z.string().trim().url("Please enter a valid company website URL"),
  linkedIn: z.string().trim().url("Please enter a valid LinkedIn URL"),
});

// Combined schema for the final submission
const onboardingSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const CompanyOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
  });

  // Separate validation for each step
  const validateCurrentStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "companyName",
          "companySize",
          "city",
          "country",
        ]);
        break;
      case 2:
        isValid = await trigger(["description", "foundedYear"]);
        break;
      case 3:
        // For optional fields in step 3
        const website = watch("website");
        const linkedIn = watch("linkedIn");

        if (!website && !linkedIn) {
          isValid = true; // Both fields are optional
        } else {
          isValid = await trigger(["website", "linkedIn"]);
        }
        break;
    }

    return isValid;
  };

  const handleContinue = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      if (currentStep !== 3) {
        await handleContinue();
        return;
      }

      // Final submission
      const isValid = await validateCurrentStep();
      if (!isValid) return;

      // Prepare data for submission
      const companyData = {
        ...data,
        logo: data.logo || null, // Ensure logo is null if not provided
      };

      console.log(companyData); // For debugging
      // Save company data to the database
      const result = await saveCompanyData(companyData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        // Handle validation errors
        if (result.errors) {
          const errorMessage = result.errors
            .map((err) => err.message)
            .join(", ");
          toast.error(errorMessage);
        } else {
          // Handle general error
          toast.error(result.error || "Failed to save company data");
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      console.error("Submission error:", error);
    }
  };

  // Handle file upload for logo
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("logo", file);
    }
  };

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const steps = [
    {
      number: 1,
      title: "Basic Information",
      description: "Let's start with your company details",
    },
    {
      number: 2,
      title: "Company Profile",
      description: "Tell us more about your organization",
    },
    {
      number: 3,
      title: "Finishing Up",
      description: "Add your company logo and online presence",
    },
  ];

  // Show success component if submission is successful
  if (isSubmitted) {
    return <OnboardingSuccess onNavigate={(path) => router.push(path)} />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">
            Setup Your Company Profile
          </h1>
          <p className="text-base-content/70">
            Help us customize your experience and showcase your company to
            potential candidates
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-base-content/70">Profile Setup</span>
            <span className="text-sm font-medium">{currentStep}/3</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center gap-2 ${
                currentStep >= step.number
                  ? "text-primary"
                  : "text-base-content/40"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-primary text-primary-content"
                    : "bg-base-300"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Basic Information
                </h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Company Name</span>
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder="Enter your company's legal name"
                    className={`input input-bordered w-full ${
                      errors.companyName ? "input-error" : ""
                    }`}
                  />
                  {errors.companyName && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.companyName.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Company Size</span>
                  </label>
                  <select
                    {...register("companySize")}
                    className={`select select-bordered w-full ${
                      errors.companySize ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.companySize && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.companySize.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Headquarters Location
                    </span>
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        {...register("city")}
                        type="text"
                        placeholder="City"
                        className={`input input-bordered w-full ${
                          errors.city ? "input-error" : ""
                        }`}
                      />
                      {errors.city && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.city.message}
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        {...register("country")}
                        type="text"
                        placeholder="Country"
                        className={`input input-bordered w-full ${
                          errors.country ? "input-error" : ""
                        }`}
                      />
                      {errors.country && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.country.message}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Company Profile
                </h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Company Description
                    </span>
                    <span className="label-text-alt">Max 500 characters</span>
                  </label>
                  <textarea
                    {...register("description")}
                    className={`textarea textarea-bordered h-32 ${
                      errors.description ? "textarea-error" : ""
                    }`}
                    placeholder="Tell candidates about your company's mission and values..."
                  />
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Founded Year</span>
                  </label>
                  <input
                    {...register("foundedYear", { valueAsNumber: true })}
                    type="number"
                    placeholder="YYYY"
                    className={`input input-bordered w-full ${
                      errors.foundedYear ? "input-error" : ""
                    }`}
                  />
                  {errors.foundedYear && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.foundedYear.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Company Logo & Links
                </h2>

                {/* Company Logo Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Company Logo</span>
                  </label>
                  <UploadResume
                    title="Company Logo"
                    onUploadSuccess={(url) => setValue("logo", url)}
                    onUploadError={(error) => toast.error(error)}
                    allowedFileTypes={["image/jpeg", "image/png", "image/gif"]}
                    acceptedFileTypes=".jpg,.jpeg,.png,.gif"
                    maxSizeInMB={2}
                    sizeText="JPG, PNG, GIF up to 2MB"
                    error={errors.logo?.message}
                  />
                </div>

                {/* Website Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Company Website
                    </span>
                  </label>
                  <div className="flex-1 relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                      {...register("website")}
                      type="url"
                      placeholder="https://"
                      className={`input input-bordered w-full pl-10 ${
                        errors.website ? "input-error" : ""
                      }`}
                    />
                    {errors.website && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.website.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* LinkedIn Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      LinkedIn Company Page
                    </span>
                  </label>
                  <div className="flex-1 relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <input
                      {...register("linkedIn")}
                      type="url"
                      placeholder="LinkedIn URL"
                      className={`input input-bordered w-full pl-10 ${
                        errors.linkedIn ? "input-error" : ""
                      }`}
                    />
                    {errors.linkedIn && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.linkedIn.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-base-200">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Back
              </button>
              {currentStep === 3 ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Complete Setup"}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
