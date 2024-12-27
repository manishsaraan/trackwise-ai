import { z } from 'zod';

// Split the schema into steps
export const step1Schema = z.object({
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    companySize: z.enum([
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000+ employees',
    ]),
    city: z.string().min(2, 'City is required'),
    country: z.string().min(2, 'Country is required'),
    preferredCurrency: z.enum(['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'AED']),
});

export const step2Schema = z.object({
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description cannot exceed 500 characters'),
    foundedYear: z
        .number()
        .min(1800, 'Year must be after 1800')
        .max(new Date().getFullYear(), 'Year cannot be in the future'),
});

export const step3Schema = z.object({
    logo: z.string().url('Company logo is required'),
    website: z.string().trim().url('Please enter a valid company website URL'),
    linkedIn: z.string().trim().url('Please enter a valid LinkedIn URL'),
});

// Combined schema for the final submission
export const onboardingSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
