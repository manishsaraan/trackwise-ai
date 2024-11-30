'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { saveJobApplication } from '@/app/actions';
import { FormData, jobFormSchema } from '@/lib/validations/job-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, Info, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import JobTitleInput from './JobTitleInput';

const workModeOptions = [
	{ value: 'On-site', label: 'On-site' },
	{ value: 'Remote', label: 'Remote' },
	{ value: 'Hybrid', label: 'Hybrid' },
];

export default function JobForm() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<string | null>(null);
	const [questions, setQuestions] = useState<string[]>([]);

	const experienceOptions = [
		{ value: 0, label: '0 Years' },
		{ value: 1, label: '1 Year' },
		{ value: 2, label: '2 Years' },
		{ value: 3, label: '3 Years' },
		{ value: 4, label: '4 Years' },
		{ value: 5, label: '5 Years' },
		{ value: 6, label: '6 Years' },
		{ value: 7, label: '7 Years' },
		{ value: 8, label: '8 Years' },
		{ value: 9, label: '9 Years' },
		{ value: 10, label: '10+ Years' },
	];

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(jobFormSchema),
		defaultValues: {
			jobTitle: '',
			location: '',
			jobDescription: '',
			position: undefined,
			workMode: undefined,
			experienceMin: undefined,
			experienceMax: undefined,
			salaryMin: null,
			salaryMax: null,
			dontPreferMin: false,
			questions: [],
		},
	});

	const selectedMinExperience = watch('experienceMin');

	// Generate max experience options: selected min + 10 years
	const maxExperienceOptions = useMemo(() => {
		if (selectedMinExperience === undefined) return [];

		const maxYears = selectedMinExperience + 10;
		const options = [];

		for (let i = selectedMinExperience; i <= maxYears; i++) {
			options.push({
				value: i,
				label: i === maxYears ? `${i}+ Years` : i === 1 ? '1 Year' : `${i} Years`,
			});
		}

		return options;
	}, [selectedMinExperience]);

	const onSubmit = async (data: FormData) => {
		console.log('Form submission started', data);
		setIsSubmitting(true);
		setSubmitResult(null);

		try {
			// Transform the form data to match the expected format
			const jobData = {
				...data,
				workMode: data.workMode,
				questions: data.questions.filter(q => q && q.trim().length > 0),
				salaryMin: data.dontPreferMin ? null : (data.salaryMin ?? null),
				salaryMax: data.dontPreferMin ? null : (data.salaryMax ?? null),
				dontPreferSalary: data.dontPreferMin,
			};

			console.log('Transformed job data:', jobData);
			const result = await saveJobApplication(jobData);

			if (result.success) {
				setSubmitResult('Job application submitted successfully!');
				reset({
					jobTitle: '',
					location: '',
					jobDescription: '',
					position: undefined,
					workMode: undefined,
					experienceMin: undefined,
					experienceMax: undefined,
					salaryMin: null,
					salaryMax: null,
					dontPreferMin: false,
					questions: [],
				});
				setQuestions([]);

				// Add a small delay before redirect to show the success message
				setTimeout(() => {
					router.push('/jobs');
				}, 1000);
			} else {
				if (result.validationErrors) {
					const errorMessage = result.validationErrors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
					setSubmitResult(`Validation Error: ${errorMessage}`);
				} else {
					setSubmitResult(`Error: ${result.error}`);
				}
			}
		} catch (error) {
			setSubmitResult('Error submitting job application. Please try again.');
			console.error('Form submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const generateJobDescription = async () => {
		try {
			// Call your AI-powered job description generation function here
			const generatedDescription = 'job description';

			// Update the textarea directly using setValue
			setValue('jobDescription', generatedDescription, {
				shouldValidate: true,
			});
		} catch (error) {
			console.error('Error generating job description:', error);
		}
	};

	const dontPreferSalary = watch('dontPreferMin');

	useEffect(() => {
		if (dontPreferSalary) {
			setValue('salaryMin', null);
			setValue('salaryMax', null);
		}
	}, [dontPreferSalary, setValue]);

	const removeQuestion = (indexToRemove: number) => {
		// Update local state
		setQuestions(questions.filter((_, index) => index !== indexToRemove));

		// Get current questions from form
		const currentQuestions = getValues('questions') || [];

		// Remove the question from form state and update
		const newQuestions = currentQuestions.filter((_, index) => index !== indexToRemove);
		setValue('questions', newQuestions, {
			shouldValidate: true, // This will trigger validation after removal
		});
	};
	console.log(errors);

	const handleJobTitleSelect = (title: string) => {
		setValue('jobTitle', title, {
			shouldValidate: true,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl  p-6">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h2 className="text-2xl font-bold mb-4">Create a New Job Posting</h2>
					<p className="text-base-content/60 text-sm">Fill out the form to post a new job opportunity.</p>
				</div>
			</div>

			<div className="form-control w-full mb-6">
				<JobTitleInput 
					onSelect={handleJobTitleSelect} 
					value={watch('jobTitle')}
					error={errors.jobTitle?.message}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<div className="form-control w-full">
					<label htmlFor="position" className="label">
						<span className="label-text font-medium">Position Type:</span>
					</label>
					<select id="position" {...register('position')} className="select select-bordered w-full">
						<option value="">Select position type</option>
						<option value="Full-time">Full-time</option>
						<option value="Part-time">Part-time</option>
						<option value="Contract">Contract</option>
						<option value="Internship">Internship</option>
					</select>
					{errors.position && <span className="text-error text-sm mt-1">{errors.position.message}</span>}
				</div>

				<div className="form-control w-full">
					<label htmlFor="workMode" className="label">
						<span className="label-text font-medium">Work Mode:</span>
					</label>
					<select id="workMode" {...register('workMode')} className="select select-bordered w-full">
						<option value="">Select work mode</option>
						{workModeOptions.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					{errors.workMode && <span className="text-error text-sm mt-1">{errors.workMode.message}</span>}
				</div>

				<div className="form-control w-full">
					<label htmlFor="location" className="label">
						<span className="label-text font-medium">Location:</span>
					</label>
					<input id="location" type="text" {...register('location')} className="input input-bordered w-full" />
					{errors.location && <span className="text-error text-sm mt-1">{errors.location.message}</span>}
				</div>
			</div>

			<div className="form-control w-full mb-6">
				<div className="flex justify-between items-center">
					<label htmlFor="jobDescription" className="label">
						<span className="label-text font-medium">Job Description:</span>
					</label>
					<button type="button" onClick={generateJobDescription} className="btn btn-sm btn-ghost">
						<Edit className="w-4 h-4" />
						Generate
					</button>
				</div>
				<textarea
					id="jobDescription"
					{...register('jobDescription')}
					className="textarea textarea-bordered w-full min-h-[200px]"
				></textarea>
				{errors.jobDescription && <span className="text-error text-sm mt-1">{errors.jobDescription.message}</span>}
			</div>

			<div className="flex gap-6 mb-6">
				<div className="form-control w-full">
					<label htmlFor="salaryMin" className="label">
						<span className="label-text font-medium">Minimum Salary:</span>
					</label>
					<input
						id="salaryMin"
						type="number"
						{...register('salaryMin', {
							valueAsNumber: true,
							disabled: dontPreferSalary,
						})}
						className={`input input-bordered w-full ${dontPreferSalary ? 'input-disabled bg-base-200' : ''}`}
						disabled={dontPreferSalary}
					/>
					{errors.salaryMin && !dontPreferSalary && (
						<span className="text-error text-sm mt-1">{errors.salaryMin.message}</span>
					)}
				</div>

				<div className="form-control w-full">
					<label htmlFor="salaryMax" className="label">
						<span className="label-text font-medium">Maximum Salary:</span>
					</label>
					<input
						id="salaryMax"
						type="number"
						{...register('salaryMax', {
							valueAsNumber: true,
							disabled: dontPreferSalary,
						})}
						className={`input input-bordered w-full ${dontPreferSalary ? 'input-disabled bg-base-200' : ''}`}
						disabled={dontPreferSalary}
					/>
					{errors.salaryMax && !dontPreferSalary && (
						<span className="text-error text-sm mt-1">{errors.salaryMax.message}</span>
					)}
				</div>
			</div>

			<div className="form-control mb-6">
				<label className="label cursor-pointer justify-start gap-2">
					<input type="checkbox" {...register('dontPreferMin')} className="checkbox checkbox-primary" />
					<span className="label-text">Don&apos;t want to specify salary range</span>
				</label>
			</div>

			<div className="flex gap-6 mb-6">
				<div className="form-control w-full">
					<label htmlFor="experienceMin" className="label">
						<span className="label-text font-medium">Minimum Experience:</span>
					</label>
					<select
						id="experienceMin"
						{...register('experienceMin', { valueAsNumber: true })}
						className="select select-bordered w-full"
					>
						<option value="">Select minimum experience</option>
						{experienceOptions.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					{errors.experienceMin && <span className="text-error text-sm mt-1">{errors.experienceMin.message}</span>}
				</div>

				<div className="form-control w-full">
					<label htmlFor="experienceMax" className="label">
						<span className="label-text font-medium">Maximum Experience:</span>
					</label>
					<select
						id="experienceMax"
						{...register('experienceMax', { valueAsNumber: true })}
						className="select select-bordered w-full"
						disabled={selectedMinExperience === undefined}
					>
						<option value="">Select maximum experience</option>
						{maxExperienceOptions.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					{errors.experienceMax && <span className="text-error text-sm mt-1">{errors.experienceMax.message}</span>}
				</div>
			</div>

			<div className="form-control w-full mb-6">
				{questions.length > 0 && (
					<div className="flex items-center gap-2 mb-2">
						<Info className="w-4 h-4 text-base-content/60" />
						<span className="text-base-content/60 font-medium">Additional Questions</span>
					</div>
				)}

				{questions.map((_, index) => (
					<div
						key={index}
						className="mb-4 relative group"
						onFocus={() => {
							/* handle focus if needed */
						}}
					>
						<div className="flex items-start gap-2">
							<span className="text-lg font-semibold min-w-[24px] mt-3">{index + 1}.</span>
							<div className="flex-1 relative">
								<textarea
									{...register(`questions.${index}`, {
										required: 'Question is required',
									})}
									className={`textarea textarea-bordered w-full ${errors.questions?.[index] ? 'textarea-error' : ''}`}
									placeholder={`Type your question here...`}
									maxLength={200}
								/>
								<button
									type="button"
									onClick={() => removeQuestion(index)}
									className="absolute -top-2 -right-2 bg-error hover:bg-error-focus text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out focus:opacity-100 shadow-md"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-4 h-4"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								<div className="flex justify-between mt-1">
									{errors.questions?.[index] && (
										<span className="text-error text-sm">{errors.questions[index]?.message}</span>
									)}
									<div className="text-xs text-gray-500 ml-auto">{watch(`questions.${index}`)?.length || 0}/200</div>
								</div>
							</div>
						</div>
					</div>
				))}

				<button
					type="button"
					onClick={() => setQuestions([...questions, ''])}
					disabled={questions.length >= 5}
					className={`btn btn-outline btn-primary ${questions.length >= 5 ? 'btn-disabled' : ''}`}
				>
					{questions.length >= 5 ? (
						'Maximum questions reached'
					) : (
						<>
							<Plus className="w-4 h-4 mr-2" />
							Add Question
						</>
					)}
				</button>

				{questions.length >= 5 && <p className="text-sm text-warning mt-2">Maximum limit of 5 questions reached</p>}
			</div>

			<button
				type="submit"
				className={`btn btn-primary w-full ${isSubmitting ? 'btn-disabled' : ''}`}
				disabled={isSubmitting}
			>
				{isSubmitting ? (
					<>
						<span className="loading loading-spinner"></span>
						Submitting...
					</>
				) : (
					'Post Job'
				)}
			</button>

			{submitResult && (
				<div className={`alert ${submitResult.includes('Error') ? 'alert-error' : 'alert-success'} mt-4`}>
					<span>{submitResult}</span>
				</div>
			)}
		</form>
	);
}
