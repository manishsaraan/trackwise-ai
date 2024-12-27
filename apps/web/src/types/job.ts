export type Job = {
	id: number;
	title: string;
	company: string;
	location: string;
	salary: string;
	workMode: string;
	description: string;
	requirements: string[];
	companyDescription: string;
}


export type ActionJobData = {
	id: number;
	title: string;
	acceptedCount?: number;
	inReviewCount?: number;
	rejectedCount?: number;
}