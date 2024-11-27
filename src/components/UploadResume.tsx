'use client';

import { useState } from 'react';

import { uploadResume } from '@/app/actions/applicant';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface UploadResumeProps {
	onUploadSuccess: (url: string) => void;
	onUploadError: (error: string) => void;
	title: string;
	allowedFileTypes: string[];
	maxSizeInMB: number;
	acceptedFileTypes: string;
	uploadText?: string;
	dragDropText?: string;
	sizeText?: string;
	error?: string;
}

export default function UploadResume({
	onUploadSuccess,
	onUploadError,
	allowedFileTypes,
	maxSizeInMB,
	acceptedFileTypes,
	uploadText = 'Upload a file',
	dragDropText = 'or drag and drop',
	sizeText,
	error,
}: UploadResumeProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [fileName, setFileName] = useState<string>('');

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validate file type and size
		if (!allowedFileTypes.includes(file.type)) {
			onUploadError(`Only ${acceptedFileTypes.replace(/\./g, '').toUpperCase()} files are allowed`);
			return;
		}
		if (file.size > maxSizeInMB * 1024 * 1024) {
			onUploadError(`File must be ${maxSizeInMB}MB or less`);
			return;
		}

		setIsUploading(true);
		setUploadSuccess(false);
		setFileName(file.name);

		try {
			const formData = new FormData();
			formData.append('file', file);

			const result = await uploadResume(formData);

			if (result.success && result.url) {
				onUploadSuccess(result.url);
				setUploadSuccess(true);
			} else {
				onUploadError(result.error || 'Failed to upload file');
				setFileName('');
			}
		} catch (error) {
			onUploadError('An unexpected error occurred');
			setFileName('');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="form-control">
			<div className={`border-2 border-dashed rounded-lg p-6 ${error ? 'border-error' : 'border-base-300'}`}>
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
									<span className="link link-primary">{uploadText}</span>
									<input
										type="file"
										className="hidden"
										accept={acceptedFileTypes}
										onChange={handleFileChange}
										disabled={isUploading}
									/>
								</label>
								<span className="text-base-content/70"> {dragDropText}</span>
							</div>
							<p className="text-xs text-base-content/50 mt-1">
								{sizeText || `${acceptedFileTypes.replace(/\./g, '').toUpperCase()} up to ${maxSizeInMB}MB`}
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
							<p className="text-base-content/70">Successfully uploaded {fileName}</p>
							<button
								className="btn btn-ghost btn-sm mt-2"
								onClick={() => {
									setUploadSuccess(false);
									setFileName('');
								}}
							>
								Upload a different file
							</button>
						</div>
					)}
				</div>
			</div>
			{error && (
				<label className="label">
					<span className="label-text-alt text-error">{error}</span>
				</label>
			)}
		</div>
	);
}
