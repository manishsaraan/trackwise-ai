export type Applicant = {
	id: number;
	name: string;
	location: string;
	position: string;
	experience: string;
	appliedDate: string;
	aiStatus: 'passed' | 'rejected' | 'review_required';
	aiAssessment: string;
	linkedinUrl?: string;
	websiteUrl?: string;
	resumeUrl?: string;
	email: string;
	phone: string;
	status: ApplicantStatus;
	technical_skills: string[];
	immediateJoiner: boolean;
}

type ApplicantStatus = 'PENDING' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED';
