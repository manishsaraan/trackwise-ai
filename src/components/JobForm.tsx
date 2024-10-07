"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saveJobApplication } from "@/app/actions";

// Define the schema for form validation (same as in jobActions.ts)
const jobFormSchema = z
  .object({
    jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    jobDescription: z
      .string()
      .min(10, "Job description must be at least 10 characters"),
    position: z.enum(["Full-time", "Part-time", "Contract", "Internship"], {
      errorMap: () => ({ message: "Please select a valid position" }),
    }),
    salaryMin: z.number().min(0, "Minimum salary must be 0 or greater"),
    salaryMax: z.number().min(0, "Maximum salary must be 0 or greater"),
  })
  .refine((data) => data.salaryMax > data.salaryMin, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["salaryMax"],
  });

// Infer the type from the schema
type FormData = z.infer<typeof jobFormSchema>;

const JobApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await saveJobApplication(data);
      if (result.success) {
        setSubmitResult("Job application submitted successfully!");
      } else {
        setSubmitResult(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitResult("Error submitting job application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4">
      <div className="form-control w-full mb-4">
        <label htmlFor="jobTitle" className="label">
          <span className="label-text">Job Title:</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          {...register("jobTitle")}
          className="input input-bordered w-full"
        />
        {errors.jobTitle && (
          <span className="text-error text-sm mt-1">
            {errors.jobTitle.message}
          </span>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="form-control w-full">
          <label htmlFor="company" className="label">
            <span className="label-text">Company:</span>
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className="input input-bordered w-full"
          />
          {errors.company && (
            <span className="text-error text-sm mt-1">
              {errors.company.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label htmlFor="location" className="label">
            <span className="label-text">Location:</span>
          </label>
          <input
            id="location"
            type="text"
            {...register("location")}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <span className="text-error text-sm mt-1">
              {errors.location.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-control w-full mb-4">
        <label htmlFor="jobDescription" className="label">
          <span className="label-text">Job Description:</span>
        </label>
        <textarea
          id="jobDescription"
          {...register("jobDescription")}
          className="textarea textarea-bordered h-24 w-full"
        />
        {errors.jobDescription && (
          <span className="text-error text-sm mt-1">
            {errors.jobDescription.message}
          </span>
        )}
      </div>

      <div className="form-control w-full mb-4">
        <label htmlFor="position" className="label">
          <span className="label-text">Position:</span>
        </label>
        <select
          id="position"
          {...register("position")}
          className="select select-bordered w-full"
        >
          <option value="">Select a position</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        {errors.position && (
          <span className="text-error text-sm mt-1">
            {errors.position.message}
          </span>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="form-control w-full">
          <label htmlFor="salaryMin" className="label">
            <span className="label-text">Minimum Salary:</span>
          </label>
          <input
            id="salaryMin"
            type="number"
            {...register("salaryMin", { valueAsNumber: true })}
            className="input input-bordered w-full"
          />
          {errors.salaryMin && (
            <span className="text-error text-sm mt-1">
              {errors.salaryMin.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label htmlFor="salaryMax" className="label">
            <span className="label-text">Maximum Salary:</span>
          </label>
          <input
            id="salaryMax"
            type="number"
            {...register("salaryMax", { valueAsNumber: true })}
            className="input input-bordered w-full"
          />
          {errors.salaryMax && (
            <span className="text-error text-sm mt-1">
              {errors.salaryMax.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Job Application"}
      </button>

      {submitResult && (
        <div
          className={`alert ${
            submitResult.includes("Error") ? "alert-error" : "alert-success"
          } mt-4`}
        >
          <span>{submitResult}</span>
        </div>
      )}
    </form>
  );
};

export default JobApplicationForm;
