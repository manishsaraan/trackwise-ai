import React from "react";
import {
  CheckCircle,
  Home,
  ArrowRight,
  Clock,
  Cpu,
  Bell,
  Mail,
} from "lucide-react";

const ApplicationSuccessPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Success Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            {/* Success Animation */}
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-success animate-pulse" />
            </div>

            <h1 className="card-title text-2xl font-bold mb-2">
              Application Submitted!
            </h1>
            <p className="text-base-content/70 mb-6">
              Thank you for your application. Our AI is now processing your
              information.
            </p>

            {/* Timeline Steps */}
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-center gap-4 text-success">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">Application Received</p>
                  <p className="text-sm text-base-content/70">
                    Your application has been successfully submitted
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">AI Processing</p>
                  <p className="text-sm text-base-content/70">
                    Our AI is analyzing your application
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-base-content/50">
                <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">Review Stage</p>
                  <p className="text-sm text-base-content/70">
                    Your application will be reviewed by the hiring team
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next Card */}
            <div className="bg-base-200 rounded-lg p-6 w-full mb-6">
              <h2 className="font-semibold mb-4">What happens next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-0.5 text-primary" />
                  <span className="text-sm">
                    You&apos;ll receive a confirmation email with your application
                    details
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="w-5 h-5 mt-0.5 text-primary" />
                  <span className="text-sm">
                    We&apos;ll notify you when the AI processing is complete
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-primary" />
                  <span className="text-sm">
                    The hiring team will review your application within 5-7
                    business days
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-center gap-4">
              <a href="/" className="btn btn-primary">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </a>
              <a href="/jobs" className="btn btn-outline">
                Browse More Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Reference Number Card */}
        <div className="card bg-base-100 shadow-xl mt-4">
          <div className="card-body p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-base-content/70">
                Application Reference:
              </span>
              <span className="font-mono font-medium">APP-2024-8761</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccessPage;
