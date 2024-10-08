"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

// Define the schema for the applicant data
const applicantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  resumeUrl: z.string().url("Invalid resume URL"),
  currentSalary: z.number().optional(),
  receiveNotifications: z.boolean(),
  jobApplicationId: z.number().int().positive("Invalid job application ID"),
});

type ApplicantData = z.infer<typeof applicantSchema>;

export async function saveApplicantData(data: ApplicantData) {
  try {
    // Validate the input data
    const validatedData = applicantSchema.parse(data);

    // Save the data to the database
    const applicant = await prisma.applicant.create({
      data: validatedData,
    });

    return { success: true, applicant };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    console.error("Error saving applicant data:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function uploadResume(formData: FormData) {
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
