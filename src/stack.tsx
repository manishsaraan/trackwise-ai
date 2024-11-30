import { StackServerApp } from '@stackframe/stack';
import 'server-only';

export const stackServerApp = new StackServerApp({
	tokenStore: 'nextjs-cookie',
	urls: {
		signIn: '/',
		signUp: '/',
		afterSignIn: '/onboarding',
		afterSignUp: '/onboarding',
		afterSignOut: '/',
		accountSettings: '/profile',
	},
});
