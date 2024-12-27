import { z } from 'zod';

// Validation schema
export const applicationFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
    resume: z.string().min(1, 'Resume is required'),
    receiveEmails: z.boolean().optional(),
    answers: z.array(z.string().min(50, 'Answer must be at least 50 characters long')),
});

export type JobApplicationFormData = z.infer<typeof applicationFormSchema>;

export const jobApplicationSchema = applicationFormSchema.extend({
    jobApplicationId: z.number().int().positive('Invalid job application ID'),
});

export type jobApplicationSchemaData = z.infer<typeof jobApplicationSchema>;
