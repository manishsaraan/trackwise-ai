'use server';

import { getUserId } from '@/lib/server-utils';
import prisma from '@/lib/prisma';
import { stackServerApp } from '@/stack';

interface OnboardingCheckResult {
	isOnboarded: boolean;
	redirectTo?: string;
}

export async function ensureOnboarded(): Promise<OnboardingCheckResult> {
	try {
		const userId = await getUserId();
		
		if (!userId) {
			return { isOnboarded: false, redirectTo: '/login' };
		}

		// Check if user has an associated company
		const company = await prisma.company.findFirst({
			where: {
				userId: userId
			}
		});

		if (!company) {
			return { isOnboarded: false, redirectTo: '/onboarding' };
		}

		return { isOnboarded: true };

	} catch (error) {
		console.error('Error in ensureOnboarded:', error);
		return { isOnboarded: false, redirectTo: '/login' };
	}
}

export async function saveOnboardingData(companyInfo: any) {
	const user = await stackServerApp.getUser();
	console.log('user', user);
	try {
		await user?.update({
			serverMetadata: { onboarded: true, ...companyInfo },
		});
	} catch (error) {
		console.error(error);
	}
}
