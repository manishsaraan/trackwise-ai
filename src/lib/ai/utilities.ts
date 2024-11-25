import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { StructuredOutputParser } from "langchain/output_parsers";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import axios from "axios";
import { jobDescription } from "./prompts";
import { scoringPrompt } from "./prompts";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

export function formatResumeData(resumeData: any) {
  let formattedResume = "";

  // Personal Information
  const personalInfo = resumeData.personal_information || {};
  formattedResume += `**Personal Information:**\n`;
  formattedResume += `- **Name:** ${personalInfo.name || ""}\n`;
  const contactInfo = personalInfo.contact_information || {};
  formattedResume += `- **Email:** ${contactInfo.email || ""}\n`;
  formattedResume += `- **Phone Number:** ${contactInfo.phone_number || ""}\n`;
  formattedResume += `- **LinkedIn Profile:** ${
    contactInfo.linkedin_profile || ""
  }\n`;
  formattedResume += `- **Portfolio Website:** ${
    contactInfo.portfolio_website || ""
  }\n\n`;

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
    formattedResume += `  - **Job Title:** ${job.job_title || ""}\n`;
    formattedResume += `  - **Company Name:** ${job.company_name || ""}\n`;
    formattedResume += `  - **Location:** ${job.location || ""}\n`;
    formattedResume += `  - **Start Date:** ${job.start_date || ""}\n`;
    formattedResume += `  - **End Date:** ${job.end_date || ""}\n`;
    formattedResume += `  - **Responsibilities and Achievements:** ${
      job.responsibilities_and_achievements || ""
    }\n`;
  });
  formattedResume += `\n`;

  // Education
  const education = resumeData.education || [];
  formattedResume += `**Education:**\n`;
  education.forEach((edu: any, index: number) => {
    formattedResume += `- **Degree ${index + 1}:**\n`;
    formattedResume += `  - **Degree:** ${edu.degree || ""}\n`;
    formattedResume += `  - **Field of Study:** ${edu.field_of_study || ""}\n`;
    formattedResume += `  - **Institution Name:** ${
      edu.institution_name || ""
    }\n`;
    formattedResume += `  - **Location:** ${edu.location || ""}\n`;
    formattedResume += `  - **Graduation Date:** ${
      edu.graduation_date || ""
    }\n`;
    formattedResume += `  - **GPA or Honors:** ${edu.gpa_or_honors || ""}\n`;
  });
  formattedResume += `\n`;

  // Certifications
  const certifications = resumeData.certifications || [];
  formattedResume += `**Certifications:**\n`;
  certifications.forEach((cert: any, index: number) => {
    formattedResume += `- **Certification ${index + 1}:**\n`;
    formattedResume += `  - **Certification Name:** ${
      cert.certification_name || ""
    }\n`;
    formattedResume += `  - **Issuing Organization:** ${
      cert.issuing_organization || ""
    }\n`;
    formattedResume += `  - **Date Obtained:** ${cert.date_obtained || ""}\n`;
  });
  formattedResume += `\n`;

  // Projects
  const projects = resumeData.projects || [];
  formattedResume += `**Projects:**\n`;
  projects.forEach((project: any, index: number) => {
    formattedResume += `- **Project ${index + 1}:**\n`;
    formattedResume += `  - **Project Name:** ${project.project_name || ""}\n`;
    formattedResume += `  - **Description:** ${project.description || ""}\n`;
    formattedResume += `  - **Technologies Used:** ${(
      project.technologies_used || []
    ).join(", ")}\n`;
    formattedResume += `  - **Role:** ${project.role || ""}\n`;
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
      language.language || ""
    }, **Proficiency Level:** ${language.proficiency_level || ""}\n`;
  });
  formattedResume += `\n`;

  // Location and Relocation
  const locationRelocation = resumeData.location_and_relocation || {};
  formattedResume += `**Location and Relocation:**\n`;
  formattedResume += `- **Current Location:** ${
    locationRelocation.current_location || ""
  }\n`;
  formattedResume += `- **Willingness to Relocate:** ${
    locationRelocation.willingness_to_relocate || ""
  }\n\n`;

  // Availability
  const availability = resumeData.availability || {};
  formattedResume += `**Availability:**\n`;
  formattedResume += `- **Notice Period:** ${
    availability.notice_period || ""
  }\n`;
  formattedResume += `- **Earliest Start Date:** ${
    availability.earliest_start_date || ""
  }\n\n`;

  // Publications and Patents
  const publications = resumeData.publications_and_patents || [];
  formattedResume += `**Publications and Patents:**\n`;
  publications.forEach((pub: any, index: number) => {
    formattedResume += `- **Publication ${index + 1}:**\n`;
    formattedResume += `  - **Title:** ${pub.title || ""}\n`;
    formattedResume += `  - **Date:** ${pub.date || ""}\n`;
    formattedResume += `  - **Description:** ${pub.description || ""}\n`;
  });
  formattedResume += `\n`;

  // Volunteer Work and Interests
  formattedResume += `**Volunteer Work and Interests:**\n`;
  formattedResume += `${resumeData.volunteer_work_and_interests || ""}\n`;

  return formattedResume.trim();
}

export async function parsePDF(pdfUrl: string) {
  try {
    // Fetch the PDF content from the URL
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    // const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });

    // Use PDFLoader to load the PDF from the buffer
    const loader = new PDFLoader(pdfBlob);
    const docs = await loader.load();

    // Combine all pages into a single document
    const combinedContent = docs.map((doc) => doc.pageContent).join("\n\n");
    const pdfFileName = path.basename(pdfUrl);

    return [
      {
        pageContent: combinedContent,
        metadata: { source: pdfFileName },
      },
    ];
  } catch (error) {
    console.error("Error parsing PDF from URL:", error);
    throw error;
  }
}

export function getModel() {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0, // Set temperature to 0 for deterministic output
    openAIApiKey: OPENAI_API_KEY,
  });

  const template = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an AI language model designed to extract structured information from unstructured text. Provide the response in valid JSON format based on the user's input.",
    ],
    ["user", "{input}"],
  ]);

  const chain1 = template.pipe(model);

  return chain1;
}

export async function parseResume(
  pdfUrl: string
): Promise<{ parsedOutput: any; parsedOutput2: any } | undefined> {
  const pdfContent = await parsePDF(pdfUrl);

  const resumeOutput = pdfContent[0].pageContent;

  const extractionPrompt = `
  Given the resume text below, extract the relevant information and present it in the specified JSON format.
  
  ---
  
  Resume Text:
  
  ${resumeOutput}
  
  ---
  
  Extraction Instructions:
  
  1. Personal Information:
     - Name: Extract the candidate's full name.
     - Contact Information:
       - Email
       - Phone Number
       - LinkedIn Profile URL (if available)
       - Portfolio or Personal Website (if available)
  
  2. Technical Skills:
     - List all technical skills mentioned, such as programming languages, tools, frameworks, and technologies.
  
  3. Soft Skills:
     - List soft skills like communication, leadership, teamwork, problem-solving, etc.
  
  4. Work Experience: For each position held, extract:
     - Job Title
     - Company Name
     - Location (City, Country)
     - Start Date (Month and Year)
     - End Date (Month and Year or "Present" if currently employed)
     - Responsibilities and Achievements: Summarize key responsibilities and notable achievements.
  
  5. Education: For each educational qualification, extract:
     - Degree
     - Field of Study
     - Institution Name
     - Location (City, Country)
     - Graduation Date (Month and Year)
     - GPA or Honors (if mentioned)
  
  6. Certifications: For each certification, extract:
     - Certification Name
     - Issuing Organization
     - Date Obtained (Month and Year)
  
  7. Projects: For each project, extract:
     - Project Name
     - Description: Brief summary of the project.
     - Technologies Used
     - Role in Project
  
  8. Achievements and Awards:
     - List any awards, recognitions, or significant accomplishments.
  
  9. Languages:
     - List languages known and proficiency levels (e.g., native, fluent, intermediate).
  
  10. Location and Relocation:
      - Current Location
      - Willingness to Relocate: Yes/No
  
  11. Availability:
      - Notice Period (if mentioned)
      - Earliest Start Date (if mentioned)
  
  12. Publications and Patents: (if applicable)
      - Title
      - Publication/Patent Date
      - Brief Description
  
  13. Volunteer Work and Interests:
      - Summarize any volunteer experiences or interests that may be relevant.
  
  ---
  
  Important Guidelines:
  
  - **Accuracy:** Extract information exactly as presented in the resume without adding or omitting details.
  - **Consistency:** Use the same date format throughout (preferably "Month Year", e.g., "June 2021").
  - **Handling Missing Information:** If a particular piece of information is not available, use an empty string "" or an empty array [] as appropriate.
  - **Lists:** For fields expecting multiple items (e.g., skills, languages), provide an array of strings.
  - **Text Fields:** For fields like responsibilities, achievements, and descriptions, provide concise summaries without personal opinions or interpretations.
  - **Confidentiality:** Do not include sensitive personal information beyond what is specified (e.g., do not extract social security numbers).
  
  ---
  
  **Output Format:**
  
  Provide the extracted information in the following JSON format:
  
  {
    "personal_information": {
      "name": "",
      "contact_information": {
        "email": "",
        "phone_number": "",
        "linkedin_profile": "",
        "portfolio_website": ""
      }
    },
    "technical_skills": ["", ""],
    "soft_skills": ["", ""],
    "work_experience": [
      {
        "job_title": "",
        "company_name": "",
        "location": "",
        "start_date": "",
        "end_date": "",
        "responsibilities_and_achievements": ""
      }
      // Repeat for each position
    ],
    "education": [
      {
        "degree": "",
        "field_of_study": "",
        "institution_name": "",
        "location": "",
        "graduation_date": "",
        "gpa_or_honors": ""
      }
      // Repeat for each qualification
    ],
    "certifications": [
      {
        "certification_name": "",
        "issuing_organization": "",
        "date_obtained": ""
      }
      // Repeat for each certification
    ],
    "projects": [
      {
        "project_name": "",
        "description": "",
        "technologies_used": ["", ""],
        "role": ""
      }
      // Repeat for each project
    ],
    "achievements_and_awards": ["", ""],
    "languages": [
      {
        "language": "",
        "proficiency_level": ""
      }
      // Repeat for each language
    ],
    "location_and_relocation": {
      "current_location": "",
      "willingness_to_relocate": ""
    },
    "availability": {
      "notice_period": "",
      "earliest_start_date": ""
    },
    "publications_and_patents": [
      {
        "title": "",
        "date": "",
        "description": ""
      }
      // Repeat for each publication or patent
    ],
    "volunteer_work_and_interests": ""
  }
  
  ---
  
  **Please ensure that the final output is valid JSON. Do not include any additional text or explanations.**
  `;

  const extractJobDescription = `
  Here's the prompt to parse relevant information from the job description and return a JSON:

Given the job description text below, extract the relevant information and present it in the specified JSON format.

---

Job Description Text:

${jobDescription}

---

Extraction Instructions:

1. Job Title:
   - Extract the job title mentioned in the job description.

2. Company Information:
   - Company Name
   - Company Location (City, Country)

3. Role Description:
   - Provide a brief summary of the role and its main responsibilities.

4. Required Skills:
   - List all the required technical skills, programming languages, tools, frameworks, and technologies mentioned.

5. Preferred Skills:
   - List any preferred or additional skills that are mentioned but not strictly required.

6. Required Experience:
   - Minimum Years of Experience
   - Specific Domain or Industry Experience (if mentioned)

7. Education Requirements:
   - Minimum Degree Required
   - Preferred Degrees or Fields of Study

8. Certifications:
   - List any required or preferred certifications.

9. Responsibilities:
   - Summarize the key responsibilities and tasks associated with the role.

10. Soft Skills:
    - List the desired soft skills, such as communication, teamwork, leadership, etc.

11. Benefits and Perks: (if mentioned)
    - List any notable benefits, perks, or advantages of working in this role or company.

---

Important Guidelines:

- **Accuracy:** Extract information exactly as presented in the job description without adding or omitting details.
- **Handling Missing Information:** If a particular piece of information is not available, use an empty string "" or an empty array [] as appropriate.
- **Lists:** For fields expecting multiple items (e.g., skills, responsibilities), provide an array of strings.
- **Text Fields:** For fields like role description and responsibilities, provide concise summaries without personal opinions or interpretations.

---

**Output Format:**

Provide the extracted information in the following JSON format:

{
  "job_title": "",
  "company_information": {
    "company_name": "",
    "company_location": ""
  },
  "role_description": "",
  "required_skills": ["", ""],
  "preferred_skills": ["", ""],
  "required_experience": {
    "minimum_years": "",
    "domain_or_industry": ""
  },
  "education_requirements": {
    "minimum_degree": "",
    "preferred_degrees_or_fields": ["", ""]
  },
  "certifications": ["", ""],
  "responsibilities": ["", ""],
  "soft_skills": ["", ""],
  "benefits_and_perks": ["", ""]
}

---

**Please ensure that the final output is valid JSON. Do not include any additional text or explanations.**

This prompt will extract relevant information from the job description and return it in a structured JSON format. The extracted information includes the job title, company information, role description, required and preferred skills, experience and education requirements, certifications, responsibilities, soft skills, and benefits/perks.

The guidelines emphasize accuracy, handling missing information, providing lists for multiple items, and using concise summaries for text fields. The output format ensures that the extracted data is presented in a consistent and machine-readable format.

You can integrate this job description parsing prompt with the resume parsing prompt and the scoring prompt to create a comprehensive system for evaluating candidate resumes against job requirements.
  `;
  // console.log(extractionPrompt)
  const chain1 = getModel();
  const response1 = await chain1.invoke({
    input: extractionPrompt,
  });

  const response2 = await chain1.invoke({
    input: extractJobDescription,
  });

  try {
    // Trim whitespace and attempt to parse as JSON
    const jsonResponse = typeof response1.content === 'string' ? response1.content.trim() : response1.content.toString().trim();
    const jsonResponse2 = typeof response2.content === 'string' ? response2.content.trim() : response2.content.toString().trim();
      
    // Remove extra characters that might be preventing parsing (if any)
    const correctedResponse = jsonResponse.replace(/^[^{]*|[^}]*$/g, ""); // Removes any text before the `{` and after the `}`
    const correctedResponse2 = jsonResponse2.replace(/^[^{]*|[^}]*$/g, ""); // Removes any text before the `{` and after the `}`

    // Parse the JSON
    const parsedOutput = JSON.parse(correctedResponse);
    const parsedOutput2 = JSON.parse(correctedResponse2);

    return { parsedOutput, parsedOutput2 };
  } catch (error) {
    console.error("Failed to parse LLM output:", error);
    // console.error("LLM Output:", response1.content);
  }
}

export async function getScoringData(
  parsedPdfData: any,
  jobDescription: string
) {
  // const formattedResume = formatResumeData(parsedPdfData);
  // console.log(formattedResume, "formattedResume");
  const getPrompt = scoringPrompt(parsedPdfData, jobDescription);

  const chain1 = getModel();
  const response2 = await chain1.invoke({
    input: getPrompt,
  });

  try {
    // Remove any leading/trailing whitespace and newline characters
    const cleanedContent = typeof response2.content === 'string' 
        ? response2.content.trim() 
        : response2.content.toString().trim();
    // Extract JSON content from markdown code block
    const jsonContent = cleanedContent?.match(/```json\n([^]*?)```/)?.[1];
    if (!jsonContent) {
      console.error("No JSON content found in markdown code block.");
      return null;
    }

    // Parse the JSON string
    const parsedData = JSON.parse(jsonContent);
    return parsedData;
  } catch (error) {
    console.error("Error parsing scoring data:", error);
    return { score: 0, justification: "Error parsing scoring data" };
  }
}

export function formatJobDescriptionData(jobData: any) {
  let formattedJobDescription = "";

  // Job Title
  formattedJobDescription += `**Job Title:** ${jobData.job_title || ""}\n\n`;

  // Company Information
  const companyInfo = jobData.company_information || {};
  formattedJobDescription += `**Company Information:**\n`;
  formattedJobDescription += `- **Company Name:** ${
    companyInfo.company_name || ""
  }\n`;
  formattedJobDescription += `- **Location:** ${
    companyInfo.company_location || ""
  }\n\n`;

  // Role Description
  formattedJobDescription += `**Role Description:**\n${
    jobData.role_description || ""
  }\n\n`;

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
  formattedJobDescription += `- **Minimum Years:** ${
    requiredExperience.minimum_years || ""
  }\n`;
  formattedJobDescription += `- **Domain or Industry:** ${
    requiredExperience.domain_or_industry || ""
  }\n\n`;

  // Education Requirements
  const educationRequirements = jobData.education_requirements || {};
  formattedJobDescription += `**Education Requirements:**\n`;
  formattedJobDescription += `- **Minimum Degree:** ${
    educationRequirements.minimum_degree || ""
  }\n`;
  formattedJobDescription += `- **Preferred Degrees or Fields:** ${
    educationRequirements.preferred_degrees_or_fields.join(", ") || ""
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
