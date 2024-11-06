"use client";

import { useState } from "react";
import { uploadResume } from "@/app/actions/applicant";
import { CheckCircle2, Loader2 } from "lucide-react"; // Import icons

interface UploadResumeProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
}

export default function UploadResume({
  onUploadSuccess,
  onUploadError,
}: UploadResumeProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      onUploadError("Only PDF, DOC, and DOCX files are allowed");
      return;
    }
    if (file.size > 5000000) {
      onUploadError("Resume must be 5MB or less");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadResume(formData);
      if (result.success) {
        onUploadSuccess(result.url as string);
        setUploadSuccess(true);
      } else {
        onUploadError(result.error || "Failed to upload resume");
        setFileName("");
      }
    } catch (error) {
      onUploadError("An unexpected error occurred");
      setFileName("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Resume</span>
      </label>
      <div className="border-2 border-dashed border-base-300 rounded-lg p-6">
        <div className="text-center">
          {!isUploading && !uploadSuccess && (
            <>
              <svg
                className="mx-auto h-12 w-12 text-base-content/40"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-2">
                <label className="cursor-pointer">
                  <span className="link link-primary">Upload a file</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                <span className="text-base-content/70"> or drag and drop</span>
              </div>
              <p className="text-xs text-base-content/50 mt-1">
                PDF, DOC up to 10MB
              </p>
            </>
          )}

          {isUploading && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-base-content/70">Uploading {fileName}...</p>
            </div>
          )}

          {uploadSuccess && !isUploading && (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <p className="text-base-content/70">
                Successfully uploaded {fileName}
              </p>
              <button
                className="btn btn-ghost btn-sm mt-2"
                onClick={() => {
                  setUploadSuccess(false);
                  setFileName("");
                }}
              >
                Upload a different file
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
