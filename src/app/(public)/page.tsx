import React from "react";
import Link from "next/link";
import {
  Brain,
  Users,
  Clock,
  Search,
  LineChart,
  Zap,
  CheckCircle,
  ArrowRight,
  Github,
} from "lucide-react";
import GoogleSignIn from "@/app/components/ui/GoogleSignIn";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-gradient-to-b from-primary/5 to-base-100">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="font-heading text-8xl font-bold mb-6 leading-tight">
              AI-Powered Hiring,{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="font-body text-xl text-base-content/70 mb-12 leading-relaxed max-w-2xl mx-auto">
              Transform your recruitment process with intelligent candidate
              screening, automated assessments, and real-time insights. Find the
              perfect talent faster than ever.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <GoogleSignIn />
                <p className="text-base-content/60 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video Demo Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Watch how our platform transforms your hiring process from start
              to finish.
            </p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-base-300">
            {/* Replace with actual YouTube embed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-base-content/60">YouTube Video Placeholder</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Our AI-powered ATS streamlines your hiring process, saving time
              and helping you make better hiring decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="card-title mb-2">AI-Powered Screening</h3>
                <p className="text-base-content/70">
                  Automatically evaluate candidates based on job requirements,
                  skills, and experience. Get instant insights and
                  recommendations.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="card-title mb-2">Time-Saving Automation</h3>
                <p className="text-base-content/70">
                  Reduce manual screening time by 75%. Automated candidate
                  assessment and ranking helps you focus on the best matches.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="card-title mb-2">Data-Driven Insights</h3>
                <p className="text-base-content/70">
                  Make informed decisions with detailed analytics and insights
                  about your hiring pipeline and candidate quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Transform Your Hiring Process
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">90% Faster Screening</h3>
                    <p className="text-base-content/70">
                      AI-powered screening reduces manual review time from hours
                      to minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Better Quality Hires</h3>
                    <p className="text-base-content/70">
                      Advanced matching algorithms ensure you find candidates
                      who truly fit your requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Never Miss Top Talent
                    </h3>
                    <p className="text-base-content/70">
                      Smart candidate tracking ensures promising applicants
                      don't slip through the cracks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats stats-vertical shadow bg-base-100">
              <div className="stat">
                <div className="stat-title">Time Saved</div>
                <div className="stat-value text-primary">75%</div>
                <div className="stat-desc">In screening process</div>
              </div>

              <div className="stat">
                <div className="stat-title">Better Matches</div>
                <div className="stat-value text-secondary">90%</div>
                <div className="stat-desc">Candidate fit accuracy</div>
              </div>

              <div className="stat">
                <div className="stat-title">Cost Reduction</div>
                <div className="stat-value text-accent">50%</div>
                <div className="stat-desc">In hiring costs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our platform to find and
            hire the best talent.
          </p>
          <button className="btn btn-primary btn-lg gap-2">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="mt-4 text-base-content/60">
            14-day free trial • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
