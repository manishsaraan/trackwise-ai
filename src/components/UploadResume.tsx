"use client";

import { useState } from "react";
import { uploadResume } from "@/app/actions/applicant";

interface UploadResumeProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
}

export default function UploadResume({
  onUploadSuccess,
  onUploadError,
}: UploadResumeProps) {
  const [isUploading, setIsUploading] = useState(false);

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
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadResume(formData);
      if (result.success) {
        onUploadSuccess(result.url);
      } else {
        onUploadError(result.error || "Failed to upload resume");
      }
    } catch (error) {
      onUploadError("An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor="resume">
        <span className="label-text">Attach Resume</span>
      </label>
      <input
        type="file"
        id="resume"
        className="file-input file-input-bordered w-full max-w-xs"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && <span className="text-info">Uploading resume...</span>}
    </div>
  );
}
