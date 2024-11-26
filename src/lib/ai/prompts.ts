export const job = `
Experience - 0-2 years
Compensation: Not disclosed
Location - Hyderabad

Job Description:
Programmers / Software Developers at GlobusIT | Transforming Digital Horizons
Full Stack Developer (MERN/Python): 0-2 years exp

Roles and Responsibilities:
- Develop and maintain web applications using MERN or Python stack.
- Design and implement user interfaces and user experiences.
- Build RESTful APIs to interact with frontend applications.
- Write clean, efficient, and maintainable code.
- Collaborate with cross-functional teams to deliver projects on time.
- Troubleshoot and resolve technical issues.
- Stay up-to-date with the latest technology trends.

Eligibility Criteria:
- Bachelor's degree in Computer Science, Information Technology, or a related field.
- 0-2 years of experience in software development, preferably in a healthcare or IT environment.

Essential Skills:
- MERN Stack
  - Backend: Node.js, Express.js, MongoDB, PostgreSQL
  - State Management: Redux or Context API
- Python Stack
  - Frontend: JavaScript, React, HTML5, CSS3 or Python with Django templates
  - Database: PostgreSQL or MySQL or MongoDB

Additional Skills:
- RESTful API development
- Version control (Git)
- Agile development methodologies (Scrum, Kanban)
- Cloud platforms (Ubuntu, CentOS based) optional

Role: Full Stack Developer
Industry Type: IT Services & Consulting
Department: Engineering - Software & QA
Employment Type: Full Time, Permanent
Role Category: Software Development

Education:
- UG: Any Graduate
- PG: Any Postgraduate

Key Skills:
- Backend
- PostgreSQL
- MySQL
- Healthcare
- MongoDB
- Scrum
- Information Technology
- Python
- CSS3
`;

export const jobDescription = `
Job opportunity: Full-Stack Developer

Key Responsibilities:

We are seeking a talented and experienced Full-Stack Developer with a strong focus on React JS to join our dynamic team
The ideal candidate will have a strong background in both front-end and back-end development, with a passion for creating innovative and efficient web applications
Strong proficiency in front-end technologies, including HTML, CSS, and JavaScript etc
Expierence building apps using ReactJs, NextJS, Redux etc
Experience with NodeJS frameworks eg expres
Experience with database systems (MySQL, PostgreSQL, MongoDB, etc.).
As a Full-Stack Developer, you will be responsible for designing, implementing, testing, and maintaining web applications throughout the entire software development lifecycle
Develop user interfaces with a strong emphasis on usability and responsive design using React JS.
Collaborate with UI/UX designers to implement responsive and visually appealing designs.
Create REST ful APIs to support front-end functionalities.
Implement security and data protection measures.
Integrate front-end and back-end components seamlessly.
Collaborate with cross-functional teams to define, design, and ship new features.
Debug and resolve issues reported by users or team members.
Use version control systems such as Git to manage and track changes.
Collaborate with other team members through pull requests and code reviews.
Write and maintain unit and integration tests to ensure the reliability of applications.
Conduct automated testing and implements continuous integration and deployment pipelines.
Create and maintain technical documentation for code, APIs, and processes.
Provide support and documentation to assist with troubleshooting and maintenance.
 

Requirements

Knowledge of version control systems, especially Git.
Strong problem-solving and debugging skills.
Excellent communication and collaboration abilities.
Ability to work independently and collaboratively in a team environment.
 

Please send your CV here info@artzen.io
`;

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
   - Assign a score of 1 if the candidate has relevant certifications, 0.5 for partially relevant certifications, and 0 for no relevant certifications.

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

8. **Recommendation:**
   - Based on the overall suitability score, provide a recommendation for the next step:
     - If the overall suitability score is less than or equal to 2, recommend "Reject".
     - If the overall suitability score is greater than or equal to 4, recommend "Pass".
     - If the overall suitability score is between 2 and 4 (exclusive), recommend "Keep for HR Review".

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
