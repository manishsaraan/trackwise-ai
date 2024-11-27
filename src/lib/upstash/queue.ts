import { Client } from '@upstash/qstash';

// Define types for our jobs
interface ResumeProcessJob {
	userId: string;
	resumeUrl: string;
}

interface EmailJob {
	to: string;
	subject: string;
	body: string;
}

// Initialize QStash client
const qstash = new Client({
	token: process.env.QSTASH_TOKEN!,
});

const QUEUE_DELAY_MINUTES = parseInt(process.env.QUEUE_DELAY_MINUTES || '0');
const QUEUE_DELAY_SECONDS = QUEUE_DELAY_MINUTES * 60;

export async function queueResumeProcessing(applicationId: string) {
	try {
		const response = await qstash.publishJSON({
			url: `${process.env.API_BASE_URL}/api/process-resume`,
			body: { applicationId },
			retries: 3, // Retry failed jobs up to 3 times
			notBefore: Math.floor(Date.now() / 1000) + QUEUE_DELAY_SECONDS, // Add delay in seconds
		});

		console.log(response, 'Queued resume processing for application:', applicationId);

		return {
			success: true,
			messageId: response.messageId,
			scheduledFor: new Date(Date.now() + QUEUE_DELAY_MINUTES * 60 * 1000).toISOString(),
		};
	} catch (error) {
		console.error('Failed to queue resume processing:', error);
		return { success: false, error };
	}
}

export async function queueEmail(job: EmailJob) {
	try {
		const response = await qstash.publishJSON({
			url: `${process.env.API_BASE_URL}/api/queue/send-email`,
			body: job,
			retries: 3,
		});

		return { success: true, messageId: response.messageId };
	} catch (error) {
		console.error('Failed to queue email:', error);
		return { success: false, error };
	}
}
