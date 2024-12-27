'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { onboardingSchema, OnboardingFormData } from '@/lib/validations/onboarding';
 
import {  getUserId } from '@/lib/server-utils';



export async function saveCompanyData(data: OnboardingFormData) {
	try {
		const userId = await getUserId();
		
		if (!userId) {
			return {
				success: false,
				error: 'Authentication required',
				message: 'You must be logged in to create a company',
			};
		}

		const validatedData = onboardingSchema.parse(data);

		// Create the company with associated userId
		const newCompany = await prisma.company.create({
			data: {
				...validatedData,
				userId: userId
			},
		});

		// Update the user with the new companyId
		await prisma.user.update({
			where: { id: userId },
			data: { companyId: newCompany.id }
		});
 

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
