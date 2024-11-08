import React from "react";
import { X, ArrowLeft } from "lucide-react";

interface Question {
  question: string;
  answer: string;
}

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: {
    name: string;
    resumeUrl: string;
    questions: Question[];
  };
}

const ApplicationDetailsModal = ({
  isOpen,
  onClose,
  applicant,
}: ApplicationDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-[70%] bg-base-100 h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 border-b border-base-200 z-10">
          <div className="flex items-center gap-3 p-4">
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold flex-1">Back to Applicants</h2>
            <button
              className="btn btn-ghost btn-sm text-success"
              onClick={() => window.open(applicant.resumeUrl, "_blank")}
            >
              Download Resume
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Resume Section */}
          <div className="space-y-4">
            <div className="border border-base-200 rounded-lg p-4 min-h-[500px] bg-base-200">
              <iframe
                src={`https://docs.google.com/gview?url=${applicant.resumeUrl}&embedded=true`}
                className="w-full h-[600px]"
                title="Resume Preview"
              />
            </div>
          </div>

          {/* Questions & Answers Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-base-200 pb-4">
              Questionnaire Responses
            </h3>
            <div className="space-y-6">
              {applicant.questions.map((qa, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium text-base-content/70">
                    {qa.question}
                  </h4>
                  <p className="text-base-content whitespace-pre-wrap">
                    {qa.answer}
                  </p>
                  {index < applicant.questions.length - 1 && (
                    <div className="border-b border-base-200 pt-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
