"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

// Update the schema for the applicant data
const applicantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  resumeUrl: z.string().url("Invalid resume URL"),
  currentSalary: z.number().min(0, "Salary cannot be negative"),
  receiveNotifications: z.boolean(),
  jobApplicationId: z.number().int().positive("Invalid job application ID"),
  answers: z.array(z.string().min(50, "Answer must be at least 50 characters")),
});

type ApplicantData = z.infer<typeof applicantSchema>;

export async function saveApplicantData(data: ApplicantData) {
  try {
    // Validate the input data
    const validatedData = applicantSchema.parse(data);

    // Get the job questions to map with answers
    const job = await prisma.jobApplication.findUnique({
      where: { id: validatedData.jobApplicationId },
      include: {
        questions: {
          orderBy: {
            orderIndex: "asc",
          },
        },
      },
    });

    if (!job) {
      return { success: false, error: "Job not found" };
    }

    // Create the applicant and answers in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the applicant
      const applicant = await tx.applicant.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          resumeUrl: validatedData.resumeUrl,
          currentSalary: validatedData.currentSalary,
          receiveNotifications: validatedData.receiveNotifications,
          jobApplicationId: validatedData.jobApplicationId,
        },
      });

      // Create answers for each question
      const answerPromises = job.questions.map((question, index) => {
        return tx.questionAnswer.create({
          data: {
            answer: validatedData.answers[index],
            questionId: question.id,
            applicantId: applicant.id,
          },
        });
      });

      await Promise.all(answerPromises);

      return applicant;
    });

    return {
      success: true,
      applicant: result,
      message: "Application submitted successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    console.error("Error saving applicant data:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function uploadResume(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    const buffer = await file.arrayBuffer();
    const blob = await put(file.name, buffer, {
      contentType: file.type,
      access: "public",
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: "Failed to upload resume" };
  }
}

export async function getAllApplicants(status?: ApplicantStatus) {
  try {
    const applicants = await prisma.applicant.findMany({
      where: { aiProcessed: true, status },
    });
    return { success: true, applicants };
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return { success: false, error: "Failed to fetch applicants" };
  }
}

type ApplicantStatus = "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";

export async function updateApplicantStatus(
  applicantId: number,
  status: ApplicantStatus
) {
  try {
    // First get the current applicant to know their previous status
    const currentApplicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
    });

    if (!currentApplicant) {
      return {
        success: false,
        error: "Applicant not found",
      };
    }

    const updatedApplicant = await prisma.applicant.update({
      where: { id: applicantId },
      data: {
        status,
        statusUpdatedAt: new Date(),
      },
    });

    // Update the counts in JobApplication
    await prisma.jobApplication.update({
      where: { id: updatedApplicant.jobApplicationId },
      data: {
        // Increment new status count
        acceptedCount:
          status === "ACCEPTED"
            ? { increment: 1 }
            : currentApplicant.status === "ACCEPTED"
            ? { decrement: 1 }
            : undefined,
        rejectedCount:
          status === "REJECTED"
            ? { increment: 1 }
            : currentApplicant.status === "REJECTED"
            ? { decrement: 1 }
            : undefined,
        inReviewCount:
          status === "IN_REVIEW"
            ? { increment: 1 }
            : currentApplicant.status === "IN_REVIEW"
            ? { decrement: 1 }
            : undefined,
      },
    });

    return {
      success: true,
      applicant: updatedApplicant,
      message: `Application status updated to ${status}`,
    };
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return {
      success: false,
      error: "Failed to update applicant status",
    };
  }
}
