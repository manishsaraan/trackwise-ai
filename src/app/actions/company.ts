'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

import { saveOnboardingData } from './onboarding-functions';

const companySchema = z.object({
	companyName: z.string().min(1, 'Company name is required'),
	description: z.string().min(1, 'Description is required'),
	companySize: z.string().min(1, 'Company size is required'),
	foundedYear: z.number().min(1800).max(new Date().getFullYear()),
	city: z.string().min(1, 'City is required'),
	country: z.string().min(1, 'Country is required'),
	website: z.string().url('Company website URL is required'),
	linkedIn: z.string().url('LinkedIn URL is required'),
	logo: z.string().url('Company logo is required'),
});

type CompanyData = z.infer<typeof companySchema>;

export async function saveCompanyData(data: CompanyData) {
	try {
		const validatedData = companySchema.parse(data);

		const newCompany = await prisma.company.create({
			data: validatedData,
		});

		await saveOnboardingData(newCompany.city);
		return {
			success: true,
			company: newCompany,
			message: 'Company created successfully',
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, errors: error.errors };
		}
		console.error('Error saving company data:', error);
		return { success: false, error: 'An unexpected error occurred' };
	}
}

export async function getCompanyById(id: number) {
	try {
		const company = await prisma.company.findUnique({
			where: { id },
			include: {
				jobs: true,
			},
		});

		if (!company) {
			return { success: false, error: 'Company not found' };
		}

		return { success: true, company };
	} catch (error) {
		console.error('Error fetching company:', error);
		return { success: false, error: 'Failed to fetch company' };
	}
}

export async function getAllCompanies() {
	try {
		const companies = await prisma.company.findMany({
			include: {
				_count: {
					select: {
						jobs: true,
					},
				},
			},
		});

		return { success: true, companies };
	} catch (error) {
		console.error('Error fetching companies:', error);
		return { success: false, error: 'Failed to fetch companies' };
	}
}
