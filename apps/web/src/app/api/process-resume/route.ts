import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getScoringData, parseResume } from '@ats/ai';
import prisma from '@/lib/prisma';
import { ApplicantStatus } from '@prisma/client';
import { Receiver } from '@upstash/qstash';

const receiver = new Receiver({
	currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
	nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export async function POST(req: Request) {
	console.log('Processing resume request received');
	const headersList = headers();
	const signature = headersList.get('upstash-signature');
	const body = await req.text();

	const isValid = await receiver.verify({
		signature: signature || '',
		body,
		url: `${process.env.API_BASE_URL}/api/process-resume`,
	});

	if (!isValid) {
		console.log('Invalid signature');
		return new NextResponse('Unauthorized', { status: 401 });
	}

	try {
		const { applicationId } = JSON.parse(body);

		if (!applicationId) {
			console.log('No applicationId provided');
			return NextResponse.json({ error: 'No applicationId provided' }, { status: 400 });
		}

		// Fetch application data
		const applicant = await prisma.applicant.findUnique({
			where: { id: parseInt(applicationId) },
			include: {
				jobApplication: true,
			},
		});

		if (!applicant || !applicant.resumeUrl) {
			return NextResponse.json({ error: 'Application not found or resume URL missing' }, { status: 404 });
		}

		console.log('Processing resume for application:', applicationId);
		// Parse the resume from the URL
		const parsedResume = await parseResume(applicant.resumeUrl, applicant.jobApplication.jobDescription);

		const resumeData = {
			technicalSkills: parsedResume?.parsedOutput.technical_skills,
			workExperience: parsedResume?.parsedOutput.work_experience,
			personalInformation: parsedResume?.parsedOutput.personal_information?.contact_information,
		};

		// Get the scoring data
		const scoringData = await getScoringData(parsedResume?.parsedOutput, parsedResume?.parsedOutput2);

		// Update the applicant and job application in a transaction
		const updatedData = await prisma.$transaction(async tx => {
			// Update the applicant with the new status
			const updatedApplicant = await tx.applicant.update({
				where: { id: parseInt(applicationId) },
				data: {
					status: 'IN_REVIEW' as ApplicantStatus,
					statusUpdatedAt: new Date(),
					explanation: scoringData.explanation,
					resumeData: resumeData,
					aiProcessed: true,
				},
			});

			// Update the job application counts
			const updatedJob = await tx.jobApplication.update({
				where: { id: applicant.jobApplicationId },
				data: {
					inReviewCount: { increment: 1 },
					totalApplicants: { increment: 1 },
				},
			});

			return { updatedApplicant, updatedJob };
		});

		return NextResponse.json({
			applicationId,
			score: scoringData.overall_suitability_score,
			justification: scoringData.explanation,
			status: updatedData.updatedApplicant.status,
		});
	} catch (error) {
		console.error('Error processing resume:', error);
		return NextResponse.json({ error: 'Error processing resume' }, { status: 500 });
	}
}

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const applicationId = searchParams.get('applicationId');

	if (!applicationId) {
		return NextResponse.json({ error: 'No applicationId provided' }, { status: 400 });
	}

	try {
		// Fetch application data
		const applicant = await prisma.applicant.findUnique({
			where: { id: parseInt(applicationId) },
			include: {
				jobApplication: true,
			},
		});

		if (!applicant || !applicant.resumeUrl) {
			return NextResponse.json({ error: 'Application not found or resume URL missing' }, { status: 404 });
		}

		console.log('Processing resume for application:', applicationId);
		// Parse the resume from the URL
		const parsedResume = await parseResume(applicant.resumeUrl, applicant.jobApplication.jobDescription);

		const resumeData = {
			technicalSkills: parsedResume?.parsedOutput.technical_skills,
			workExperience: parsedResume?.parsedOutput.work_experience,
			personalInformation: parsedResume?.parsedOutput.personal_information?.contact_information,
		};

		// Get the scoring data
		const scoringData = await getScoringData(parsedResume?.parsedOutput, parsedResume?.parsedOutput2);

		// Update the applicant and job application in a transaction
		const updatedData = await prisma.$transaction(async tx => {
			// Update the applicant with the new status
			const updatedApplicant = await tx.applicant.update({
				where: { id: parseInt(applicationId) },
				data: {
					status: scoringData.recommendation as ApplicantStatus,
					statusUpdatedAt: new Date(),
					explanation: scoringData.explanation,
					resumeData: resumeData,
					aiProcessed: true,
				},
			});

			// Update the job application counts
			const updatedJob = await tx.jobApplication.update({
				where: { id: applicant.jobApplicationId },
				data: {
					inReviewCount: { increment: 1 },
					totalApplicants: { increment: 1 },
				},
			});

			return { updatedApplicant, updatedJob };
		});

		return NextResponse.json({
			applicationId,
			score: scoringData.overall_suitability_score,
			justification: scoringData.explanation,
			status: updatedData.updatedApplicant.status,
		});
	} catch (error) {
		console.error('Error processing resume:', error);
		return NextResponse.json({ error: 'Error processing resume' }, { status: 500 });
	}
}
