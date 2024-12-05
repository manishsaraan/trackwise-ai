'use server';

import { getSession, getUserId } from '@/lib/server-utils';

interface OnboardingCheckResult {
	isOnboarded: boolean;
	redirectTo?: string;
}

export async function ensureOnboarded(): Promise<OnboardingCheckResult> {
	try {
		const session = await getSession();		

		if(session?.user?.company) {
			return { isOnboarded: true };
		}

		return { isOnboarded: false, redirectTo: '/onboarding' };

	} catch (error) {
		console.error('Error in ensureOnboarded:', error);
		return { isOnboarded: false, redirectTo: '/login' };
	}
}

export async function saveOnboardingData(companyInfo: any) {
	const userId = await getUserId();

	try {
		 
	} catch (error) {
		console.error(error);
	}
}
