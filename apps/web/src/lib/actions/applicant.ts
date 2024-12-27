'use server';

import prisma from '@/lib/prisma';
import { queueResumeProcessing } from '@/lib/upstash/queue';
import { put } from '@vercel/blob';
import { z } from 'zod';
import { jobApplicationSchema, jobApplicationSchemaData } from '@/lib/validations/applicant';
import { revalidatePath } from 'next/cache';
import { ApplicantStatus } from '@prisma/client';

export async function saveApplicantData(data: jobApplicationSchemaData) {
	try {
		// Validate the input data
		const validatedData = jobApplicationSchema.parse(data);

		// Get the job questions to map with answers
		const job = await prisma.jobApplication.findUnique({
			where: { id: validatedData.jobApplicationId },
			include: {
				questions: {
					orderBy: {
						orderIndex: 'asc',
					},
				},
			},
		});

		if (!job) {
			return { success: false, error: 'Job not found' };
		}

		// Create the applicant and answers in a transaction
		const result = await prisma.$transaction(async (tx: any) => {
			// Create the applicant
			const applicant = await tx.applicant.create({
				data: {
					firstName: validatedData.firstName,
					lastName: validatedData.lastName,
					email: validatedData.email,
					phone: validatedData.phone,
					resumeUrl: validatedData.resume,
					receiveNotifications: validatedData.receiveEmails,
					jobApplicationId: validatedData.jobApplicationId,
				},
			});

			// Create answers for each question
			if(validatedData.answers && (validatedData.answers.length !== job.questions.length)) {
				const answerPromises = job.questions.map((question: any, index: number) => {
					return tx.questionAnswer.create({
						data: {
							answer: validatedData.answers[index],
							questionId: question.id,
							applicantId: applicant.id,
						},
					});
				});

				await Promise.all(answerPromises);
		}

			return applicant;
		});

		// Queue the resume processing
		await queueResumeProcessing(result.id.toString());

		return {
			success: true,
			applicant: result,
			message: 'Application submitted successfully',
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, errors: error.errors };
		}
		console.error('Error saving applicant data:', error);
		return { success: false, error: 'An unexpected error occurred' };
	}
}

export async function uploadResume(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
	try {
		const file = formData.get('file') as File;
		if (!file) {
			throw new Error('No file provided');
		}

		const buffer = await file.arrayBuffer();
		const blob = await put(file.name, buffer, {
			contentType: file.type,
			access: 'public',
		});

		return { success: true, url: blob.url };
	} catch (error) {
		console.error('Error uploading file:', error);
		return { success: false, error: 'Failed to upload resume' };
	}
}

interface GetApplicantsParams {
	status: string;
	jobId: number;
}

export async function getAllApplicants({ status, jobId }: GetApplicantsParams) {
	try {
		const applicants = await prisma.applicant.findMany({
			where: {
				status: status as ApplicantStatus,
				jobApplicationId: jobId,
			},
			
			orderBy: {
				createdAt: 'desc',
			},
		});
		
		return {
			success: true,
			data: applicants,
		};
	} catch (error) {
		console.error('Error fetching applicants:', error);
		return {
			success: false,
			error: 'Failed to fetch applicants',
		};
	}
}

export async function updateApplicantStatus(applicantId: number, status: ApplicantStatus) {
	try {
		// First get the current applicant to know their previous status
		const currentApplicant = await prisma.applicant.findUnique({
			where: { id: applicantId },
		});

		if (!currentApplicant) {
			return {
				success: false,
				error: 'Applicant not found',
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
					status === 'ACCEPTED' 
						? { increment: 1 } 
						: currentApplicant.status === 'ACCEPTED' 
							? { decrement: 1 } 
							: undefined,
				rejectedCount: 
					status === 'REJECTED' 
						? { increment: 1 } 
						: currentApplicant.status === 'REJECTED' 
							? { decrement: 1 } 
							: undefined,
				inReviewCount: 
					status === 'IN_REVIEW' 
						? { increment: 1 } 
						: currentApplicant.status === 'IN_REVIEW' 
							? { decrement: 1 } 
							: undefined,
			},
		});

		// Revalidate the page to show updated data
		revalidatePath('/jobs/[jobSlug]/applicants');

		return {
			success: true,
			applicant: updatedApplicant,
			message: `Application status updated to ${status}`,
		};
	} catch (error) {
		console.error('Error updating applicant status:', error);
		return {
			success: false,
			error: 'Failed to update applicant status',
		};
	}
}
