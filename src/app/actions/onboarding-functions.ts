'use server';

import { redirect } from 'next/navigation';

import { stackServerApp } from '@/stack';

export async function ensureOnboarded() {
	const user = await stackServerApp.getUser();
	console.log('user', user?.serverMetadata);
	if (!user?.serverMetadata?.onboarded) {
		return redirect('/onboarding');
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
