import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { StructuredOutputParser } from "langchain/output_parsers";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import { z } from "zod";
import fs from "fs/promises";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

// ... (keep all your existing functions like formatResumeData, parsePDF, saveResumeToPinecone, etc.)

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!jobDescription) {
      return NextResponse.json(
        { error: "No job description provided" },
        { status: 400 }
      );
    }

    // Create a temporary file to store the uploaded PDF
    const tempDir = path.join(process.cwd(), "tmp");
    await fs.mkdir(tempDir, { recursive: true });
    const tempFilePath = path.join(tempDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(tempFilePath, Buffer.from(fileBuffer));

    // Parse the resume
    const parsedResume = await parseResume(tempFilePath);

    // Get the scoring data
    const scoringData = await getScoringData(parsedResume, jobDescription);

    // Clean up the temporary file
    await fs.unlink(tempFilePath);

    return NextResponse.json({
      fileName: file.name,
      score: scoringData.score,
      justification: scoringData.justification,
    });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { error: "Error processing resume" },
      { status: 500 }
    );
  }
}

// Implement the POST method
export { POST as POST };
