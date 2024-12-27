import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import axios from 'axios';
import path from 'path';
import { extractResumeInfoFn, extractJobDescriptionFn, scoringPrompt} from '../prompts'
import { getModel } from '../openai';

export function formatResumeData(resumeData: any) {
	let formattedResume = '';

	// Personal Information
	const personalInfo = resumeData.personal_information || {};
	formattedResume += `**Personal Information:**\n`;
	formattedResume += `- **Name:** ${personalInfo.name || ''}\n`;
	const contactInfo = personalInfo.contact_information || {};
	formattedResume += `- **Email:** ${contactInfo.email || ''}\n`;
	formattedResume += `- **Phone Number:** ${contactInfo.phone_number || ''}\n`;
	formattedResume += `- **LinkedIn Profile:** ${contactInfo.linkedin_profile || ''}\n`;
	formattedResume += `- **Portfolio Website:** ${contactInfo.portfolio_website || ''}\n\n`;

	// Technical Skills
	const technicalSkills = resumeData.technical_skills || [];
	formattedResume += `**Technical Skills:**\n`;
	technicalSkills.forEach((skill: string) => {
		formattedResume += `- ${skill}\n`;
	});
	formattedResume += `\n`;

	// Soft Skills
	const softSkills = resumeData.soft_skills || [];
	formattedResume += `**Soft Skills:**\n`;
	softSkills.forEach((skill: string) => {
		formattedResume += `- ${skill}\n`;
	});
	formattedResume += `\n`;

	// Work Experience
	const workExperience = resumeData.work_experience || [];
	formattedResume += `**Work Experience:**\n`;
	workExperience.forEach((job: any, index: number) => {
		formattedResume += `- **Position ${index + 1}:**\n`;
		formattedResume += `  - **Job Title:** ${job.job_title || ''}\n`;
		formattedResume += `  - **Company Name:** ${job.company_name || ''}\n`;
		formattedResume += `  - **Location:** ${job.location || ''}\n`;
		formattedResume += `  - **Start Date:** ${job.start_date || ''}\n`;
		formattedResume += `  - **End Date:** ${job.end_date || ''}\n`;
		formattedResume += `  - **Responsibilities and Achievements:** ${job.responsibilities_and_achievements || ''}\n`;
	});
	formattedResume += `\n`;

	// Education
	const education = resumeData.education || [];
	formattedResume += `**Education:**\n`;
	education.forEach((edu: any, index: number) => {
		formattedResume += `- **Degree ${index + 1}:**\n`;
		formattedResume += `  - **Degree:** ${edu.degree || ''}\n`;
		formattedResume += `  - **Field of Study:** ${edu.field_of_study || ''}\n`;
		formattedResume += `  - **Institution Name:** ${edu.institution_name || ''}\n`;
		formattedResume += `  - **Location:** ${edu.location || ''}\n`;
		formattedResume += `  - **Graduation Date:** ${edu.graduation_date || ''}\n`;
		formattedResume += `  - **GPA or Honors:** ${edu.gpa_or_honors || ''}\n`;
	});
	formattedResume += `\n`;

	// Certifications
	const certifications = resumeData.certifications || [];
	formattedResume += `**Certifications:**\n`;
	certifications.forEach((cert: any, index: number) => {
		formattedResume += `- **Certification ${index + 1}:**\n`;
		formattedResume += `  - **Certification Name:** ${cert.certification_name || ''}\n`;
		formattedResume += `  - **Issuing Organization:** ${cert.issuing_organization || ''}\n`;
		formattedResume += `  - **Date Obtained:** ${cert.date_obtained || ''}\n`;
	});
	formattedResume += `\n`;

	// Projects
	const projects = resumeData.projects || [];
	formattedResume += `**Projects:**\n`;
	projects.forEach((project: any, index: number) => {
		formattedResume += `- **Project ${index + 1}:**\n`;
		formattedResume += `  - **Project Name:** ${project.project_name || ''}\n`;
		formattedResume += `  - **Description:** ${project.description || ''}\n`;
		formattedResume += `  - **Technologies Used:** ${(project.technologies_used || []).join(', ')}\n`;
		formattedResume += `  - **Role:** ${project.role || ''}\n`;
	});
	formattedResume += `\n`;

	// Achievements and Awards
	const achievements = resumeData.achievements_and_awards || [];
	formattedResume += `**Achievements and Awards:**\n`;
	achievements.forEach((achievement: string) => {
		formattedResume += `- ${achievement}\n`;
	});
	formattedResume += `\n`;

	// Languages
	const languages = resumeData.languages || [];
	formattedResume += `**Languages:**\n`;
	languages.forEach((language: any) => {
		formattedResume += `- **Language:** ${
			language.language || ''
		}, **Proficiency Level:** ${language.proficiency_level || ''}\n`;
	});
	formattedResume += `\n`;

	// Location and Relocation
	const locationRelocation = resumeData.location_and_relocation || {};
	formattedResume += `**Location and Relocation:**\n`;
	formattedResume += `- **Current Location:** ${locationRelocation.current_location || ''}\n`;
	formattedResume += `- **Willingness to Relocate:** ${locationRelocation.willingness_to_relocate || ''}\n\n`;

	// Availability
	const availability = resumeData.availability || {};
	formattedResume += `**Availability:**\n`;
	formattedResume += `- **Notice Period:** ${availability.notice_period || ''}\n`;
	formattedResume += `- **Earliest Start Date:** ${availability.earliest_start_date || ''}\n\n`;

	// Publications and Patents
	const publications = resumeData.publications_and_patents || [];
	formattedResume += `**Publications and Patents:**\n`;
	publications.forEach((pub: any, index: number) => {
		formattedResume += `- **Publication ${index + 1}:**\n`;
		formattedResume += `  - **Title:** ${pub.title || ''}\n`;
		formattedResume += `  - **Date:** ${pub.date || ''}\n`;
		formattedResume += `  - **Description:** ${pub.description || ''}\n`;
	});
	formattedResume += `\n`;

	// Volunteer Work and Interests
	formattedResume += `**Volunteer Work and Interests:**\n`;
	formattedResume += `${resumeData.volunteer_work_and_interests || ''}\n`;

	return formattedResume.trim();
}

export async function parsePDF(pdfUrl: string) {
	try {
		// Fetch the PDF content from the URL
		const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
		// const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
		const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

		// Use PDFLoader to load the PDF from the buffer
		const loader = new PDFLoader(pdfBlob);
		const docs = await loader.load();

		// Combine all pages into a single document
		const combinedContent = docs.map(doc => doc.pageContent).join('\n\n');
		const pdfFileName = path.basename(pdfUrl);

		return [
			{
				pageContent: combinedContent,
				metadata: { source: pdfFileName },
			},
		];
	} catch (error) {
		console.error('Error parsing PDF from URL:', error);
		throw error;
	}
}

export async function parseResume(pdfUrl: string, jobDescription:string): Promise<{ parsedOutput: any; parsedOutput2: any } | undefined> {
	const pdfContent = await parsePDF(pdfUrl);

	const resumeOutput = pdfContent[0].pageContent;

    const extractionPrompt = extractResumeInfoFn(resumeOutput);
	const extractJobDescription = extractJobDescriptionFn(jobDescription);

	const chain1 = getModel();
	const response1 = await chain1.invoke({
		input: extractionPrompt,
	});

	const response2 = await chain1.invoke({
		input: extractJobDescription,
	});

	try {
		// Trim whitespace and attempt to parse as JSON
		const jsonResponse =
			typeof response1.content === 'string' ? response1.content.trim() : response1.content.toString().trim();
		const jsonResponse2 =
			typeof response2.content === 'string' ? response2.content.trim() : response2.content.toString().trim();

		// Remove extra characters that might be preventing parsing (if any)
		const correctedResponse = jsonResponse.replace(/^[^{]*|[^}]*$/g, ''); // Removes any text before the `{` and after the `}`
		const correctedResponse2 = jsonResponse2.replace(/^[^{]*|[^}]*$/g, ''); // Removes any text before the `{` and after the `}`

		// Parse the JSON
		const parsedOutput = JSON.parse(correctedResponse);
		const parsedOutput2 = JSON.parse(correctedResponse2);

		return { parsedOutput, parsedOutput2 };
	} catch (error) {
		console.error('Failed to parse LLM output:', error);
		// console.error("LLM Output:", response1.content);
	}
}

export async function getScoringData(parsedPdfData: any, jobDescription: string) {
	const getPrompt = scoringPrompt(parsedPdfData, jobDescription);
console.log(getPrompt,"*dfdf")
	const chain1 = getModel();
	const response2 = await chain1.invoke({
		input: getPrompt,
	});

	try {
		// Remove any leading/trailing whitespace and newline characters
		const cleanedContent =
			typeof response2.content === 'string' ? response2.content.trim() : response2.content.toString().trim();
		// Extract JSON content from markdown code block
		const jsonContent = cleanedContent?.match(/```json\n([^]*?)```/)?.[1];
		if (!jsonContent) {
			console.error('No JSON content found in markdown code block.');
			return null;
		}

		// Parse the JSON string
		const parsedData = JSON.parse(jsonContent);
		return parsedData;
	} catch (error) {
		console.error('Error parsing scoring data:', error);
		return { score: 0, justification: 'Error parsing scoring data' };
	}
}

export function formatJobDescriptionData(jobData: any) {
	let formattedJobDescription = '';

	// Job Title
	formattedJobDescription += `**Job Title:** ${jobData.job_title || ''}\n\n`;

	// Company Information
	const companyInfo = jobData.company_information || {};
	formattedJobDescription += `**Company Information:**\n`;
	formattedJobDescription += `- **Company Name:** ${companyInfo.company_name || ''}\n`;
	formattedJobDescription += `- **Location:** ${companyInfo.company_location || ''}\n\n`;

	// Role Description
	formattedJobDescription += `**Role Description:**\n${jobData.role_description || ''}\n\n`;

	// Required Skills
	const requiredSkills = jobData.required_skills || [];
	formattedJobDescription += `**Required Skills:**\n`;
	requiredSkills.forEach((skill: string) => {
		formattedJobDescription += `- ${skill}\n`;
	});
	formattedJobDescription += `\n`;

	// Preferred Skills
	const preferredSkills = jobData.preferred_skills || [];
	formattedJobDescription += `**Preferred Skills:**\n`;
	preferredSkills.forEach((skill: string) => {
		formattedJobDescription += `- ${skill}\n`;
	});
	formattedJobDescription += `\n`;

	// Required Experience
	const requiredExperience = jobData.required_experience || {};
	formattedJobDescription += `**Required Experience:**\n`;
	formattedJobDescription += `- **Minimum Years:** ${requiredExperience.minimum_years || ''}\n`;
	formattedJobDescription += `- **Domain or Industry:** ${requiredExperience.domain_or_industry || ''}\n\n`;

	// Education Requirements
	const educationRequirements = jobData.education_requirements || {};
	formattedJobDescription += `**Education Requirements:**\n`;
	formattedJobDescription += `- **Minimum Degree:** ${educationRequirements.minimum_degree || ''}\n`;
	formattedJobDescription += `- **Preferred Degrees or Fields:** ${
		educationRequirements.preferred_degrees_or_fields.join(', ') || ''
	}\n\n`;

	// Certifications
	const certifications = jobData.certifications || [];
	formattedJobDescription += `**Certifications:**\n`;
	certifications.forEach((cert: string) => {
		formattedJobDescription += `- ${cert}\n`;
	});
	formattedJobDescription += `\n`;

	// Responsibilities
	const responsibilities = jobData.responsibilities || [];
	formattedJobDescription += `**Responsibilities:**\n`;
	responsibilities.forEach((responsibility: string) => {
		formattedJobDescription += `- ${responsibility}\n`;
	});
	formattedJobDescription += `\n`;

	// Soft Skills
	const softSkills = jobData.soft_skills || [];
	formattedJobDescription += `**Soft Skills:**\n`;
	softSkills.forEach((skill: string) => {
		formattedJobDescription += `- ${skill}\n`;
	});
	formattedJobDescription += `\n`;

	// Benefits and Perks
	const benefitsAndPerks = jobData.benefits_and_perks || [];
	formattedJobDescription += `**Benefits and Perks:**\n`;
	benefitsAndPerks.forEach((benefit: string) => {
		formattedJobDescription += `- ${benefit}\n`;
	});
	formattedJobDescription += `\n`;

	return formattedJobDescription.trim();
}
