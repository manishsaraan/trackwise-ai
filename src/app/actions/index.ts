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
    // Validate the input data
    const validatedData = jobFormSchema.parse(formData);
    console.log("validatedData", validatedData);
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

export async function getAllJobs(status?: string) {
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
      where: {
        status: status,
      },
    });
    return { success: true, jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

export async function getJobBySlug(slug: string) {
  try {
    const job = await prisma.jobApplication.findUnique({
      where: {
        id: parseInt(slug),
      },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    if (!job) {
      return null;
    }

    // Transform the data to match the expected format
    return {
      id: job.id,
      title: job.jobTitle,
      company: job.company,
      location: job.location,
      salary: job.dontPreferSalary
        ? "Salary not disclosed"
        : `$${job.salaryMin} - $${job.salaryMax}`,
      workMode: job.workMode,
      description: job.jobDescription,
      position: job.position,
      experienceRange: `${job.experienceMin} - ${job.experienceMax} years`,
      questions: job.questions.map((q) => q.question),
      acceptedCount: job.acceptedCount,
      rejectedCount: job.rejectedCount,
      inReviewCount: job.inReviewCount,
      createdAt: job.createdAt,
    };
  } catch (error) {
    console.error("Error fetching job by slug:", error);
    throw new Error("Failed to fetch job details");
  }
}
