import { z } from 'zod';

export const jobFormSchema = z
	.object({
		jobTitle: z.string().min(1, 'Job title is required'),
		location: z.string().min(2, 'Location must be at least 2 characters'),
		jobDescription: z.string().min(10, 'Job description must be at least 10 characters'),
		position: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
			errorMap: () => ({ message: 'Please select a valid position' }),
		}),
		salaryMin: z.preprocess(
			(val) => {
				if (val === "" || val === null || val === undefined) return null;
				const num = Number(val);
				return isNaN(num) ? null : num;
			},
			z.number().nullable()
		),
		salaryMax: z.preprocess(
			(val) => {
				if (val === "" || val === null || val === undefined) return null;
				const num = Number(val);
				return isNaN(num) ? null : num;
			},
			z.number().nullable()
		),
		workMode: z.enum(['Remote', 'On-site', 'Hybrid'], {
			errorMap: () => ({ message: 'Please select a valid work mode' }),
		}),
		experienceMin: z.number().min(0, 'Minimum experience must be 0 or greater'),
		experienceMax: z.number().min(0, 'Maximum experience must be 0 or greater'),
		hideCompensation: z.boolean().optional(),
		questions: z
			.array(z.string().min(1, 'Question is required').max(200, 'Question cannot exceed 200 characters'))
			.max(5, 'Maximum 5 questions allowed'),
		dontPreferMin: z.boolean(),
		currentCtc: z.preprocess(
			(val) => {
				if (val === "" || val === null || val === undefined) return null;
				const num = Number(val);
				return isNaN(num) ? null : num;
			},
			z.number().nullable().optional()
		),
	})
	.superRefine((data, ctx) => {
		console.log('!data.dontPreferMin', !data.dontPreferMin);
		if (!data.dontPreferMin) {
			if (data.salaryMin === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Please enter the minimum salary range",
					path: ["salaryMin"],
				});
				return;
			}
			if (data.salaryMax === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Please enter the maximum salary range",
					path: ["salaryMax"],
				});
				return;
			}
			if (data.salaryMax <= data.salaryMin) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Maximum salary must be greater than minimum salary",
					path: ["salaryMax"],
				});
			}
		}
		if (data.currentCtc !== null && data.currentCtc !== undefined) {
			if (data.currentCtc < 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "CTC cannot be negative",
					path: ["currentCtc"],
				});
			}
			if (data.currentCtc > 100000000) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Please enter a reasonable amount",
					path: ["currentCtc"],
				});
			}
		}
	})
	.refine(data => data.experienceMax >= data.experienceMin, {
		message: 'Maximum experience must be greater than or equal to minimum experience',
		path: ['experienceMax'],
	})
	.refine((data) => {
		if (data.dontPreferMin) {
			return true;
		}
		if (data.salaryMin && data.salaryMax) {
			return data.salaryMax > data.salaryMin;
		}
		return true;
	}, {
		message: 'Maximum salary must be greater than minimum salary',
		path: ['salaryMax'],
	});

export type FormData = z.infer<typeof jobFormSchema>;

export const workModeEnum = {
	Remote: 'REMOTE',
	'On-site': 'ONSITE',
	Hybrid: 'HYBRID',
};
