'use client';

import { useRouter } from 'next/navigation';

import React from 'react';

import { saveApplicantData } from '@/lib/actions/applicant';
import UploadResume from '@/components/upload-resume';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { applicationFormSchema, JobApplicationFormData } from '@/lib/validations/applicant';

interface JobApplicationFormProps {
	questions: string[];
	jobId: number; // Add jobId prop
}

export function JobApplicationForm({ questions, jobId }: JobApplicationFormProps) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm<JobApplicationFormData>({
		resolver: zodResolver(applicationFormSchema),
		defaultValues: {
			receiveEmails: false,
			answers: questions.map(() => ''),
		},
	});

	const onSubmit = async (data: JobApplicationFormData) => {
		try {
			// Show loading toast
			const loadingToast = toast.loading('Submitting your application...');

			// Prepare data for submission
			const submissionData = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				resume: data.resume,
				receiveEmails: data.receiveEmails || false,
				jobApplicationId: jobId,
				answers: data.answers || [],
			};

			const result = await saveApplicantData(submissionData);

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (result.success && result.applicant) {
				// Show success toast
				toast.success('Application submitted successfully!');
				// Redirect to success page
				router.push(`/application-success/${result.applicant.id}`);
			} else {
				// Show error toast with specific message if available
				toast.error(result.error || 'Failed to submit application');
			}
		} catch (error) {
			// Show error toast
			toast.error('An unexpected error occurred. Please try again.');
			console.error('Application submission error:', error);
		}
	};

	const handleUploadSuccess = (url: string) => {
		setValue('resume', url, {
			shouldValidate: true,
			shouldDirty: true,
		});
		toast.success('Resume uploaded successfully!');
	};

	const handleUploadError = (error: string) => {
		setValue('resume', '', {
			shouldValidate: true,
			shouldDirty: true,
		});
		toast.error(error || 'Failed to upload resume');
	};

	return (
		<div className="card bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">Apply for this position</h2>
				<p className="text-base-content/70">Please fill out the form below to submit your application</p>

				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div className="form-control">
							<label className="label">
								<span className="label-text">First Name</span>
							</label>
							<input
								type="text"
								className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
								{...register('firstName')}
							/>
							{errors.firstName && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.firstName.message}</span>
								</label>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Last Name</span>
							</label>
							<input
								type="text"
								className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
								{...register('lastName')}
							/>
							{errors.lastName && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.lastName.message}</span>
								</label>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
								{...register('email')}
							/>
							{errors.email && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.email.message}</span>
								</label>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Phone</span>
							</label>
							<input
								type="tel"
								className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
								{...register('phone')}
							/>
							{errors.phone && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.phone.message}</span>
								</label>
							)}
						</div>


					</div>

					<div className="form-control">
						<UploadResume
							title="Resume"
							onUploadSuccess={handleUploadSuccess}
							onUploadError={handleUploadError}
							allowedFileTypes={['application/pdf']}
							acceptedFileTypes=".pdf"
							maxSizeInMB={10}
							sizeText="PDF up to 10MB"
							error={errors.resume?.message}
						/>
					</div>

					{questions.slice(0, 5).map((question, index) => (
						<div key={index} className="form-control">
							<label className="label">
								<span className="label-text">{question}</span>
							</label>
							<textarea
								className={`textarea textarea-bordered h-24 ${errors.answers?.[index] ? 'textarea-error' : ''}`}
								placeholder="Your answer (minimum 50 characters)..."
								{...register(`answers.${index}`)}
							/>
							{errors.answers?.[index] && (
								<label className="label">
									<span className="label-text-alt text-error">{errors.answers[index]?.message}</span>
								</label>
							)}
							<label className="label">
								<span className="label-text-alt">Characters: {watch(`answers.${index}`)?.length || 0}/50</span>
							</label>
						</div>
					))}

					<div className="form-control">
						<label className="label cursor-pointer justify-start gap-3">
							<input type="checkbox" className="checkbox checkbox-primary" {...register('receiveEmails')} />
							<span className="label-text">Receive job application status emails</span>
						</label>
					</div>

					<div className="card-actions justify-end">
						<button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<span className="loading loading-spinner"></span>
									Submitting...
								</>
							) : (
								'Submit Application'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
