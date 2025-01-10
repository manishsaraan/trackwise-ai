export const scoringPrompt = (formattedResume: string, jobDescription: string) => `
 
As an AI assistant, your task is to evaluate how well a candidate's resume matches the requirements outlined in a job description. You will receive the parsed resume data and the job description data in JSON format. Compare the relevant information, skills, experience, and education to determine the candidate's suitability for the role.

Instructions:

1. **Required Skills Match:**
   - Compare the candidate's technical_skills from the resume with the required_skills in the job description.
   - Calculate the percentage of required skills the candidate possesses.
   - Assign a score between 0 and 5 based on the percentage match:
     - 0% match: 0 points
     - 1-20% match: 1 point
     - 21-40% match: 2 points
     - 41-60% match: 3 points
     - 61-80% match: 4 points
     - 81-100% match: 5 points

2. **Preferred Skills Match:**
   - Compare the candidate's technical_skills from the resume with the preferred_skills in the job description.
   - Calculate the percentage of preferred skills the candidate possesses.
   - If there are no preferred_skills in the job description, give 100% match.
   - Assign a score between 0 and 3 based on the percentage match:
     - 0% match: 0 points
     - 1-30% match: 1 point
     - 31-60% match: 2 points
     - 61-100% match: 3 points

3. **Experience Relevance:**
   - Evaluate the candidate's work_experience against the required_experience in the job description.
   - Consider the minimum_years of experience and any specific domain_or_industry experience mentioned.
   - Assign a score between 0 and 5 based on the relevance and sufficiency of the candidate's experience:
     - No relevant experience: 0 points
     - Some relevant experience but insufficient years: 1-2 points
     - Relevant experience with sufficient years: 3-4 points
     - Highly relevant experience exceeding requirements: 5 points

4. **Education Match:**
   - Compare the candidate's education with the education_requirements in the job description.
   - Check if the candidate meets the minimum_degree requirement.
   - Consider any preferred_degrees_or_fields mentioned.
   - Assign a score between 0 and 3 based on the education match:
     - No relevant education: 0 points
     - Meets minimum degree requirement: 1 point
     - Meets minimum degree requirement and has preferred degree or field: 2 points
     - Exceeds education requirements: 3 points

5. **Certification Match:**
   - Check if the candidate possesses any certifications mentioned in the job description's certifications field.
   - If certification is mentioned in job description then assign a score of 1 if the candidate has relevant certifications, 0.5 for partially relevant certifications, and 0 for no relevant certifications.
   - If no certifications are mentioned in the job description, assign a score of 1.
   
6. **Overall Suitability:**
   - Considering all the above factors, provide an overall suitability score between 0 and 5.
   - Use your judgment to weigh the importance of each factor based on the job description.
   - Assign the overall suitability score based on the following guidelines:
     - Highly unsuitable: 0-1 points
     - Somewhat unsuitable: 2 points
     - Moderately suitable: 3 points
     - Highly suitable: 4 points
     - Exceptionally suitable: 5 points

7. **Explanation:**
   - Provide a brief explanation (2-3 sentences) of your evaluation, highlighting the key strengths and weaknesses of the candidate's resume in relation to the job requirements.
  
8. **status:**
   - Based on the overall suitability score, provide a recommendation for the next step:
     - If the overall suitability score is less than or equal to 2, recommend "REJECTED".
     - If the overall suitability score is greater than or equal to 4, recommend "ACCEPTED".
     - If the overall suitability score is between 2 and 4 (exclusive), recommend "IN_REVIEW".

Input Data:

Job Description:
\`\`\`json
${JSON.stringify(jobDescription, null, 2)}
\`\`\`

Resume:
\`\`\`json
${JSON.stringify(formattedResume, null, 2)}
\`\`\`

Output Format:

{
  "required_skills_score": <integer>,
  "preferred_skills_score": <integer>,
  "experience_relevance_score": <integer>,
  "education_match_score": <integer>,
  "certification_match_score": <float>,
  "overall_suitability_score": <integer>,
  "explanation": <string>,
  "recommendation": <string>
}

Please provide your evaluation based on the given input data and output format. Ensure the output follows the specified format and includes all the required fields.

Remember: The output should only include the JSON object, without any additional explanations or text.
`;

export const extractResumeInfoFn = (resumeOutput:string) => `
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

export const extractJobDescriptionFn = (jobDescription:string) =>  `
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