"use server";
import { z } from "zod";
import prisma from "@/lib/prisma"; // Ensure this path is correct for your Prisma client
import { WorkMode } from "@prisma/client"; // Add this import
import {
  jobFormSchema,
  FormData,
  workModeEnum,
} from "@/lib/validations/job-form";

export async function saveJobApplication(formData: FormData) {
  try {
    console.log("formData", formData);
    // Validate the input data
    const validatedData = jobFormSchema.parse(formData);

    // Create the job application with questions in a transaction
    const savedJob = await prisma.$transaction(async (tx) => {
      // First, create the job application
      const workMode = workModeEnum[validatedData.workMode];
      console.log("workMode", workMode);
      const job = await tx.jobApplication.create({
        data: {
          jobTitle: validatedData.jobTitle,
          company: "Test",
          location: validatedData.location,
          jobDescription: validatedData.jobDescription,
          position: validatedData.position,
          workMode: workMode as WorkMode,
          experienceMin: validatedData.experienceMin,
          experienceMax: validatedData.experienceMax,
          dontPreferSalary: validatedData.dontPreferMin,
          salaryMin: validatedData.salaryMin,
          salaryMax: validatedData.salaryMax,
        },
      });

      // If there are questions, create them
      if (validatedData.questions.length > 0) {
        await tx.jobQuestion.createMany({
          data: validatedData.questions.map((question, index) => ({
            question,
            orderIndex: index + 1,
            jobApplicationId: job.id,
          })),
        });
      }

      // Return the job with its questions
      return tx.jobApplication.findUnique({
        where: { id: job.id },
        include: {
          questions: {
            orderBy: {
              orderIndex: "asc",
            },
          },
        },
      });
    });

    return {
      success: true,
      job: savedJob,
      message: "Job application saved successfully",
    };
  } catch (error) {
    console.error("Error saving job application:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        validationErrors: error.errors,
      };
    }

    return {
      success: false,
      error: "Failed to save job application",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function getAllJobs() {
  try {
    const jobs = await prisma.jobApplication.findMany({
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}
