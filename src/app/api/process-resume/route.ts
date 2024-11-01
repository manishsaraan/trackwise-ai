import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getScoringData, parseResume } from "@/lib/ai/utilities";
import prisma from "@/lib/prisma"; // Import the Prisma client
import { jobDescription } from "@/lib/ai/prompts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const applicationId = searchParams.get("applicationId");

  if (!applicationId) {
    return NextResponse.json(
      { error: "No applicationId provided" },
      { status: 400 }
    );
  }

  try {
    // Fetch application data
    const applicationData = await prisma.applicant.findUnique({
      where: { id: parseInt(applicationId) },
      select: {
        id: true,
        resumeUrl: true,
      },
    });

    if (!applicationData || !applicationData.resumeUrl) {
      return NextResponse.json(
        { error: "Application not found or resume URL missing" },
        { status: 404 }
      );
    }

    const { resumeUrl } = applicationData;

    // Parse the resume from the URL
    const parsedResume = await parseResume(resumeUrl);

    // Get the scoring data
    const scoringData = await getScoringData(
      parsedResume?.parsedOutput,
      parsedResume?.parsedOutput2
    );

    // Save the parsed resume data with applicantId
    // const savedResume = await prisma.resume.create({
    //   data: {
    //     applicantId: applicationData.id, // Add the applicant ID here
    //     personalInformation: parsedResume.personal_information || {},
    //     technicalSkills: parsedResume.technical_skills || [],
    //     softSkills: parsedResume.soft_skills || [],
    //     workExperience: parsedResume.work_experience || [],
    //     education: parsedResume.education || [],
    //     certifications: parsedResume.certifications || [],
    //     projects: parsedResume.projects || [],
    //     achievements: parsedResume.achievements_and_awards || [],
    //     languages: parsedResume.languages || [],
    //     locationInfo: parsedResume.location_and_relocation || {},
    //     availability: parsedResume.availability || {},
    //     publications: parsedResume.publications_and_patents || [],
    //     volunteerWork: parsedResume.volunteer_work_and_interests || null,
    //     score: scoringData.score,
    //     justification: scoringData.justification,
    //   },
    // });
    console.log(scoringData, "scoringData");
    return NextResponse.json({
      applicationId,
      // resumeId: savedResume.id,
      score: scoringData.overall_suitability_score,
      justification: scoringData.explanation,
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { error: "Error processing resume" },
      { status: 500 }
    );
  }
}

// Remove the POST method as it's no longer needed
