import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export async function getSession() {
	const session = await getServerSession(authOptions);
	return session;
}

export async function getUserId() {
	const session = await getSession();

    if(!session) {
        return null;
    }

	return session.user.id;
}