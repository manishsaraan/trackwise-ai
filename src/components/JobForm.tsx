"use client";

import React, { useState, useMemo } from "react";
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
    salaryMin: z.number().nullable(),
    salaryMax: z.number().nullable(),
    workMode: z.enum(["Remote", "On-site", "Hybrid"], {
      errorMap: () => ({ message: "Please select a valid work mode" }),
    }),
    experienceMin: z.number().min(0, "Minimum experience must be 0 or greater"),
    experienceMax: z.number().min(0, "Maximum experience must be 0 or greater"),
    hideCompensation: z.boolean().optional(),
    questions: z
      .array(
        z
          .string()
          .min(1, "Question is required")
          .max(200, "Question cannot exceed 200 characters")
      )
      .max(5, "Maximum 5 questions allowed"),
    dontPreferMin: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.dontPreferMin) {
      if (data.salaryMin === null || data.salaryMin === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum salary is required",
          path: ["salaryMin"],
        });
      }
    }
  })
  .refine((data) => data.experienceMax >= data.experienceMin, {
    message:
      "Maximum experience must be greater than or equal to minimum experience",
    path: ["experienceMax"],
  });

// Infer the type from the schema
type FormData = z.infer<typeof jobFormSchema>;

const JobApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  const experienceOptions = [
    { value: 0, label: "0 Years" },
    { value: 1, label: "1 Year" },
    { value: 2, label: "2 Years" },
    { value: 3, label: "3 Years" },
    { value: 4, label: "4 Years" },
    { value: 5, label: "5 Years" },
    { value: 6, label: "6 Years" },
    { value: 7, label: "7 Years" },
    { value: 8, label: "8 Years" },
    { value: 9, label: "9 Years" },
    { value: 10, label: "10+ Years" },
  ];

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      questions: [], // Initialize with empty array
    },
  });

  const selectedMinExperience = watch("experienceMin");

  // Generate max experience options: selected min + 10 years
  const maxExperienceOptions = useMemo(() => {
    if (selectedMinExperience === undefined) return [];

    const maxYears = selectedMinExperience + 10;
    const options = [];

    for (let i = selectedMinExperience; i <= maxYears; i++) {
      options.push({
        value: i,
        label:
          i === maxYears ? `${i}+ Years` : i === 1 ? "1 Year" : `${i} Years`,
      });
    }

    return options;
  }, [selectedMinExperience]);

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, ""]);
    }
  };

  const removeQuestion = (indexToRemove: number) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

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

  const dontPreferSalary = watch("dontPreferMin");

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
          className="textarea textarea-bordered h-24 w-full min-h-[96px]"
        />
        {errors.jobDescription && (
          <span className="text-error text-sm mt-1">
            {errors.jobDescription.message}
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
            {...register("salaryMin", {
              valueAsNumber: true,
              disabled: dontPreferSalary,
            })}
            className={`input input-bordered w-full ${
              dontPreferSalary ? "input-disabled bg-base-200" : ""
            }`}
            disabled={dontPreferSalary}
          />
          {errors.salaryMin && !dontPreferSalary && (
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
            {...register("salaryMax", {
              valueAsNumber: true,
              disabled: dontPreferSalary,
            })}
            className={`input input-bordered w-full ${
              dontPreferSalary ? "input-disabled bg-base-200" : ""
            }`}
            disabled={dontPreferSalary}
          />
          {errors.salaryMax && !dontPreferSalary && (
            <span className="text-error text-sm mt-1">
              {errors.salaryMax.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-control mb-4">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            {...register("dontPreferMin")}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">
            Don&apos;t want to specify salary range
          </span>
        </label>
      </div>

      <div className="form-control w-full mb-4">
        <label htmlFor="workMode" className="label">
          <span className="label-text">Work Mode:</span>
        </label>
        <select
          id="workMode"
          {...register("workMode")}
          className="select select-bordered w-full"
        >
          <option value="">Select a work mode</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors.workMode && (
          <span className="text-error text-sm mt-1">
            {errors.workMode.message}
          </span>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="form-control w-full">
          <label htmlFor="experienceMin" className="label">
            <span className="label-text">Minimum Experience:</span>
          </label>
          <select
            id="experienceMin"
            {...register("experienceMin", { valueAsNumber: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select minimum experience</option>
            {experienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.experienceMin && (
            <span className="text-error text-sm mt-1">
              {errors.experienceMin.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label htmlFor="experienceMax" className="label">
            <span className="label-text">Maximum Experience:</span>
          </label>
          <select
            id="experienceMax"
            {...register("experienceMax", { valueAsNumber: true })}
            className="select select-bordered w-full"
            disabled={selectedMinExperience === undefined}
          >
            <option value="">Select maximum experience</option>
            {maxExperienceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.experienceMax && (
            <span className="text-error text-sm mt-1">
              {errors.experienceMax.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-control w-full mb-4">
        {questions.length > 0 && (
          <label className="label">
            <span className="label-text">Questions:</span>
          </label>
        )}

        {questions.map((_, index) => (
          <div
            key={index}
            className="mb-4 relative group"
            onFocus={() => {
              /* handle focus if needed */
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg font-semibold min-w-[24px] mt-3">
                {index + 1}.
              </span>
              <div className="flex-1 relative">
                <textarea
                  {...register(`questions.${index}`, {
                    required: "Question is required",
                  })}
                  className={`textarea textarea-bordered w-full ${
                    errors.questions?.[index] ? "textarea-error" : ""
                  }`}
                  placeholder={`Type your question here...`}
                  maxLength={200}
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute -top-2 -right-2 bg-error hover:bg-error-focus text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out focus:opacity-100 shadow-md"
                  style={{
                    transform: "translate(0, 0)",
                    display: "flex",
                    visibility: "visible",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex justify-between mt-1">
                  {errors.questions?.[index] && (
                    <span className="text-error text-sm">
                      {errors.questions[index]?.message}
                    </span>
                  )}
                  <div className="text-xs text-gray-500 ml-auto">
                    {watch(`questions.${index}`)?.length || 0}/200
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          disabled={questions.length >= 5}
          className={`btn btn-outline btn-primary ${
            questions.length >= 5 ? "btn-disabled" : ""
          }`}
        >
          {questions.length >= 5 ? (
            "Maximum questions reached"
          ) : (
            <>
              <span className="text-xl mr-2">+</span>
              Add Question
            </>
          )}
        </button>

        {questions.length >= 5 && (
          <p className="text-sm text-warning mt-2">
            Maximum limit of 5 questions reached
          </p>
        )}

        {/* Show array-level validation errors */}
        {errors.questions && !Array.isArray(errors.questions) && (
          <span className="text-error text-sm block mt-2">
            {errors.questions.message}
          </span>
        )}
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
