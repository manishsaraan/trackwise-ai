'use server';

import prisma from '@/lib/prisma';
// Add this import
import { FormData, jobFormSchema, workModeEnum } from '@/lib/validations/job-form';
import { stackServerApp } from '@/stack';
// Ensure this path is correct for your Prisma client
import { z } from 'zod';

// Add this import

export async function saveJobApplication(formData: FormData) {
	try {
		const user = await stackServerApp.getUser();

		if (!user) {
			return {
				success: false,
				error: 'Authentication required',
				message: 'You must be logged in to create a job',
			};
		}

		// Get user's company
		const userWithCompany = await prisma.user.findUnique({
			where: { id: user.id },
			include: { company: true },
		});

		if (!userWithCompany?.company) {
			return {
				success: false,
				error: 'Company not found',
				message: 'You must be associated with a company to create a job',
			};
		}

		const validatedData = jobFormSchema.parse(formData);

		const savedJob = await prisma.$transaction(async (tx: any) => {
			const workMode = workModeEnum[validatedData.workMode];

			const job = await tx.jobApplication.create({
				data: {
					jobTitle: validatedData.jobTitle,
					companyId: userWithCompany.company?.id,
					location: validatedData.location,
					jobDescription: validatedData.jobDescription,
					position: validatedData.position,
					
					workMode: workMode as any,
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
							orderIndex: 'asc',
						},
					},
				},
			});
		});

		return {
			success: true,
			job: savedJob,
			message: 'Job application saved successfully',
		};
	} catch (error) {
		console.error('Error saving job application:', error);

		if (error instanceof z.ZodError) {
			return {
				success: false,
				error: 'Validation failed',
				validationErrors: error.errors,
			};
		}

		return {
			success: false,
			error: 'Failed to save job application',
			message: error instanceof Error ? error.message : 'Unknown error occurred',
		};
	}
}

export async function getAllJobs(status?: any) {
	try {
		const jobs = await prisma.jobApplication.findMany({
			include: {
				questions: {
					orderBy: {
						orderIndex: 'asc',
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			where: status ? { status } : undefined,
		});
		return { success: true, jobs };
	} catch (error) {
		console.error('Error fetching jobs:', error);
		return { success: false, error: 'Failed to fetch jobs' };
	}
}

export async function getJobBySlug(slug: string) {
	try {
		const job = await prisma.jobApplication.findUnique({
			where: {
				id: parseInt(slug),
			},
			include: {
				company: true,
				questions: {
					orderBy: {
						orderIndex: 'asc',
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
			salary: job.dontPreferSalary ? 'Salary not disclosed' : `$${job.salaryMin} - $${job.salaryMax}`,
			workMode: job.workMode,
			description: job.jobDescription,
			position: job.position,
			experienceRange: `${job.experienceMin} - ${job.experienceMax} years`,
			questions: job.questions.map((q: any) => q.question),
			acceptedCount: job.acceptedCount,
			rejectedCount: job.rejectedCount,
			inReviewCount: job.inReviewCount,
			createdAt: job.createdAt,
		};
	} catch (error) {
		console.error('Error fetching job by slug:', error);
		throw new Error('Failed to fetch job details');
	}
}

export async function updateJobStatus(jobId: number, status: 'ACTIVE' | 'CLOSED') {
	try {
		const updatedJob = await prisma.jobApplication.update({
			where: { id: jobId },
			data: {
				status,
			},
		});

		return {
			success: true,
			job: updatedJob,
			message: `Job ${status === 'CLOSED' ? 'closed' : 'reopened'} successfully`,
		};
	} catch (error) {
		console.error(`Error ${status.toLowerCase()}ing job:`, error);
		return {
			success: false,
			error: `Failed to ${status.toLowerCase()} job`,
			message: error instanceof Error ? error.message : 'Unknown error occurred',
		};
	}
}
