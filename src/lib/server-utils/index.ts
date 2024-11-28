import { auth } from '@/lib/auth';
 

export async function getSession() {
	const session = await auth();
	return session;
}

export async function getUserId() {
	const session = await auth();

    if(!session) {
        return null;
    }

	return session.user.id;
}