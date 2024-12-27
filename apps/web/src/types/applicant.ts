export interface Applicant {
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
	status: 'accepted' | 'in-review' | 'rejected' | undefined;
	technical_skills: string[];
	immediateJoiner: boolean;
}
