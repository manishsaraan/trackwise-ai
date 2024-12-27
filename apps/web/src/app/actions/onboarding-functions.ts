'use server';

import { getSession } from '@/lib/server-utils';

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

 