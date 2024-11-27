'use client';

import React, { useState } from 'react';

import { CheckCircle, ChevronRight, Clock, Download, ExternalLink, FileText, MessageCircle, X } from 'lucide-react';

// Add interface for the question structure
interface ApplicationQuestion {
	question: string;
	answer: string;
	timestamp: string;
}

// Add interface for the resume structure
interface Resume {
	url: string;
	previewUrl: string;
}

// Add interface for the application data structure
interface ApplicationData {
	name: string;
	appliedDate: string;
	resume: Resume;
	questions: ApplicationQuestion[];
}

// Add interface for the modal props
interface ApplicationDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	application: ApplicationData;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({ isOpen, onClose }) => {
	// Example application data structure
	const applicationData = {
		name: 'John Smith',
		appliedDate: '2024-02-15',
		resume: {
			url: 'https://example.com/resume.pdf',
			previewUrl: 'https://example.com/resume-preview',
		},
		questions: [
			{
				question: 'Describe your experience with React and Next.js',
				answer:
					'4 years of experience building scalable applications with React. Implemented server-side rendering, dynamic routing, and API integration using Next.js in multiple production projects.',
				timestamp: '2024-02-15T10:30:00Z',
			},
			{
				question: 'How do you handle state management in large applications?',
				answer:
					'Primarily use Redux for complex state management. Implement context API for simpler states. Experience with Redux Toolkit and RTK Query for optimized data fetching.',
				timestamp: '2024-02-15T10:31:00Z',
			},
			{
				question: 'Tell us about a challenging project you worked on',
				answer:
					'Led development of a real-time collaboration platform handling 10k concurrent users. Implemented WebSocket integration, optimized performance, and reduced loading time by 60%.',
				timestamp: '2024-02-15T10:32:00Z',
			},
		],
	};

	if (!isOpen) return null;

	return (
		<dialog className="modal modal-open">
			<div className="modal-box max-w-4xl w-full">
				{/* Header */}
				<div className="flex justify-between items-start mb-6">
					<div>
						<h2 className="text-2xl font-bold">{applicationData.name}&apos;s Application</h2>
						<p className="text-base-content/60 text-sm">
							Applied on {new Date(applicationData.appliedDate).toLocaleDateString()}
						</p>
					</div>
					<button className="btn btn-sm btn-ghost" onClick={onClose}>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Resume Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold flex items-center gap-2">
								<FileText className="w-5 h-5" />
								Resume
							</h3>
							<button className="btn btn-primary btn-sm gap-2">
								<Download className="w-4 h-4" />
								Download
							</button>
						</div>

						{/* Resume Preview */}
						<div className="border-2 border-base-300 rounded-lg">
							<div className="bg-base-200 p-4 h-[500px] rounded-lg flex items-center justify-center">
								<div className="text-center text-base-content/60">
									<FileText className="w-12 h-12 mx-auto mb-2" />
									<p>Resume Preview</p>
								</div>
							</div>
						</div>
					</div>

					{/* Questionnaire Section */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<MessageCircle className="w-5 h-5" />
							Screening Questions
						</h3>

						<div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
							{applicationData.questions.map((qa, index) => (
								<div key={index} className="card bg-base-200 shadow-sm">
									<div className="card-body p-4 space-y-3">
										{/* Question */}
										<div className="flex items-start gap-3">
											<div className="badge badge-primary">{index + 1}</div>
											<div className="flex-1">
												<p className="font-medium">{qa.question}</p>
												<div className="flex items-center gap-1 text-xs text-base-content/60 mt-1">
													<Clock className="w-3 h-3" />
													{new Date(qa.timestamp).toLocaleTimeString()}
												</div>
											</div>
										</div>

										{/* Answer */}
										<div className="relative ml-10">
											<div className="absolute left-0 top-0 w-px h-full bg-base-300 -ml-7"></div>
											<div className="bg-base-100 rounded-lg p-3 relative">
												<ChevronRight className="w-4 h-4 text-base-content/30 absolute -left-4 top-3" />
												<p className="text-sm whitespace-pre-line">{qa.answer}</p>
												<div className="flex items-center gap-2 mt-2">
													<div className="badge badge-ghost badge-sm gap-1">
														<CheckCircle className="w-3 h-3" />
														Verified Response
													</div>
													<div className="text-xs text-base-content/60">{qa.answer.length}/200 characters</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Actions */}
						<div className="pt-4 border-t border-base-300">
							<button className="btn btn-outline w-full gap-2">
								<ExternalLink className="w-4 h-4" />
								Export Responses
							</button>
						</div>
					</div>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button onClick={onClose}>close</button>
			</form>
		</dialog>
	);
};

const ViewApplicationButton: React.FC = () => {
	const [, setIsModalOpen] = useState(false);

	return (
		<div>
			<button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
				View Application
			</button>
		</div>
	);
};

export default ViewApplicationButton;
