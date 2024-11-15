import { z } from 'zod';

export const jobFormSchema = z
	.object({
		jobTitle: z.string().min(3, 'Job title must be at least 3 characters'),
		location: z.string().min(2, 'Location must be at least 2 characters'),
		jobDescription: z.string().min(10, 'Job description must be at least 10 characters'),
		position: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
			errorMap: () => ({ message: 'Please select a valid position' }),
		}),
		salaryMin: z.number().nullable(),
		salaryMax: z.number().nullable(),
		workMode: z.enum(['Remote', 'On-site', 'Hybrid'], {
			errorMap: () => ({ message: 'Please select a valid work mode' }),
		}),
		experienceMin: z.number().min(0, 'Minimum experience must be 0 or greater'),
		experienceMax: z.number().min(0, 'Maximum experience must be 0 or greater'),
		hideCompensation: z.boolean().optional(),
		questions: z
			.array(z.string().min(1, 'Question is required').max(200, 'Question cannot exceed 200 characters'))
			.max(5, 'Maximum 5 questions allowed'),
		dontPreferMin: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		console.log('!data.dontPreferMin', !data.dontPreferMin);
		if (!data.dontPreferMin) {
			if (data.salaryMin === null || data.salaryMin === undefined) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Minimum salary is required',
					path: ['salaryMin'],
				});
			}
			if (data.salaryMax === null || data.salaryMax === undefined) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Maximum salary is required',
					path: ['salaryMax'],
				});
			}
			if (data.salaryMin !== null && data.salaryMax !== null && data.salaryMax < data.salaryMin) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Maximum salary must be greater than minimum salary',
					path: ['salaryMax'],
				});
			}
		}
	})
	.refine((data) => data.experienceMax >= data.experienceMin, {
		message: 'Maximum experience must be greater than or equal to minimum experience',
		path: ['experienceMax'],
	});

export type FormData = z.infer<typeof jobFormSchema>;

export const workModeEnum = {
	Remote: 'REMOTE',
	'On-site': 'ONSITE',
	Hybrid: 'HYBRID',
};
