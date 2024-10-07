"use server";
import { z } from "zod";
import prisma from "@/lib/prisma"; // Ensure this path is correct for your Prisma client

// Define the schema for form validation
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

type JobFormData = z.infer<typeof jobFormSchema>;

export async function saveJobApplication(formData: JobFormData) {
  console.log("formData", formData);
  // Validate the input data
  const validatedData = jobFormSchema.parse(formData);

  try {
    // Save the job application to the database
    const savedJob = await prisma.jobApplication.create({
      data: {
        jobTitle: validatedData.jobTitle,
        company: validatedData.company,
        location: validatedData.location,
        jobDescription: validatedData.jobDescription,
        position: validatedData.position,
        salaryMin: validatedData.salaryMin,
        salaryMax: validatedData.salaryMax,
      },
    });

    return { success: true, job: savedJob };
  } catch (error) {
    console.error("Error saving job application:", error);
    return { success: false, error: "Failed to save job application" };
  }
}
