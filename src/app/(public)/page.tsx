
import React from 'react';

import GoogleSignIn from '@/app/components/ui/GoogleSignIn';
import {
	Brain,
	CheckCircle,
	Clock,
	Code2,
	Github,
	LineChart,
	Search,
	Star,
	Users,
	Zap,
} from 'lucide-react';

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-base-100">
			{/* Hero Section - Enhanced */}
			<section className="hero min-h-[85vh] bg-gradient-to-b from-primary/5 via-base-100/50 to-base-100">
				<div className="hero-content text-center">
					<div className="max-w-4xl">
						<div className="flex items-center justify-center gap-2 mb-6">
							<div className="badge badge-primary gap-2 py-3 px-4">
								<Github className="w-4 h-4" />
								Open Source
							</div>
							<div className="badge badge-ghost gap-2 py-3 px-4">
								<Star className="w-4 h-4" />
								Star us on GitHub
							</div>
						</div>

						<h1 className="font-heading text-8xl font-bold mb-6 leading-tight">
							AI-Powered Hiring,{' '}
							<span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
								Simplified
							</span>
						</h1>

						<p className="font-body text-xl text-base-content/70 mb-8 leading-relaxed max-w-2xl mx-auto">
							An open-source Applicant Tracking System powered by AI. Streamline your hiring process with intelligent
							candidate screening and automated assessments.
						</p>

						<div className="flex items-center justify-center gap-4 mb-8">
							<GoogleSignIn />
							<a
								href="https://github.com/yourusername/yourrepo"
								className="btn btn-outline gap-2"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="w-4 h-4" />
								View on GitHub
							</a>
						</div>

						<div className="flex justify-center items-center gap-8 text-sm">
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								100% Open Source
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								Self-hostable
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-success" />
								AI-Powered
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
							Watch how our platform transforms your hiring process from start to finish.
						</p>
					</div>

					<div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
						<iframe
							className="w-full h-full"
							src="https://www.youtube.com/embed/your-video-id"
							title="Product Demo"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</div>
			</section>

			{/* Technologies Section */}
			<section className="py-16 bg-base-200/50">
				<div className="max-w-6xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Built With Modern Technologies</h2>
						<p className="text-lg text-base-content/70 max-w-2xl mx-auto">
							Powered by the latest and most reliable technologies in the industry
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
						{/* Next.js */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="Next.js" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">Next.js 14</span>
						</div>

						{/* TypeScript */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-[#007ACC] rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="TypeScript" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">TypeScript</span>
						</div>

						{/* PostgreSQL */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-[#336791] rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="PostgreSQL" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">PostgreSQL</span>
						</div>

						{/* OpenAI */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-[#00A67E] rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="OpenAI" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">OpenAI</span>
						</div>

						{/* Tailwind */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-[#38B2AC] rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="Tailwind CSS" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">Tailwind CSS</span>
						</div>

						{/* Prisma */}
						<div className="flex flex-col items-center gap-2">
							<div className="w-16 h-16 bg-[#1A202C] rounded-lg flex items-center justify-center p-2">
								<img src="/api/placeholder/48/48" alt="Prisma" className="w-12 h-12" />
							</div>
							<span className="text-sm font-medium">Prisma</span>
						</div>
					</div>

					{/* Additional Tech Tags */}
					<div className="flex flex-wrap justify-center gap-2 mt-8">
						<div className="badge badge-outline">tRPC</div>
						<div className="badge badge-outline">NextAuth</div>
						<div className="badge badge-outline">DaisyUI</div>
						<div className="badge badge-outline">Zod</div>
						<div className="badge badge-outline">React Query</div>
						<div className="badge badge-outline">React Hook Form</div>
					</div>
				</div>
			</section>

			{/* Features Section - Enhanced Copy */}
			<section className="py-24 bg-base-200">
				<div className="max-w-6xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold mb-4">Built for Modern Hiring Teams</h2>
						<p className="text-lg text-base-content/70 max-w-2xl mx-auto">
							An open-source solution that combines the power of AI with the flexibility of community-driven
							development.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* First Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
									<Brain className="w-6 h-6 text-primary" />
								</div>
								<h3 className="card-title mb-2">AI-Powered Screening</h3>
								<p className="text-base-content/70">
									Automatically evaluate candidates based on job requirements, skills, and experience. Get instant
									insights and recommendations for better decision making.
								</p>
							</div>
						</div>

						{/* Second Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
									<Clock className="w-6 h-6 text-secondary" />
								</div>
								<h3 className="card-title mb-2">Time-Saving Automation</h3>
								<p className="text-base-content/70">
									Reduce manual screening time by 75%. Our automated candidate assessment and ranking system helps you
									focus on the best matches, making your hiring process efficient.
								</p>
							</div>
						</div>

						{/* Third Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
									<LineChart className="w-6 h-6 text-accent" />
								</div>
								<h3 className="card-title mb-2">Data-Driven Insights</h3>
								<p className="text-base-content/70">
									Make informed decisions with detailed analytics about your hiring pipeline and candidate quality.
									Track key metrics and improve your hiring process continuously.
								</p>
							</div>
						</div>

						{/* Fourth Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
									<Users className="w-6 h-6 text-success" />
								</div>
								<h3 className="card-title mb-2">Better Quality Hires</h3>
								<p className="text-base-content/70">
									Advanced matching algorithms ensure you find candidates who truly fit your requirements. Get detailed
									candidate assessments and compatibility scores.
								</p>
							</div>
						</div>

						{/* Fifth Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
									<Search className="w-6 h-6 text-warning" />
								</div>
								<h3 className="card-title mb-2">Smart Candidate Tracking</h3>
								<p className="text-base-content/70">
									Never miss promising talent. Our intelligent tracking system ensures every qualified candidate gets
									proper attention and timely responses.
								</p>
							</div>
						</div>

						{/* Sixth Feature Card */}
						<div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
							<div className="card-body">
								<div className="w-12 h-12 rounded-lg bg-error/10 flex items-center justify-center mb-4">
									<Zap className="w-6 h-6 text-error" />
								</div>
								<h3 className="card-title mb-2">Real-time Updates</h3>
								<p className="text-base-content/70">
									Stay informed with real-time application status updates. Track candidate progress and get
									notifications about important application milestones.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Open Source Section - New */}
			<section className="py-24">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-6">Built by the Community, for Everyone</h2>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
										<Github className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-2">Open Source</h3>
										<p className="text-base-content/70">
											Fully open-source and free to use. Host it yourself or contribute to the project.
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
										<Code2 className="w-5 h-5 text-secondary" />
									</div>
									<div>
										<h3 className="font-semibold mb-2">Developer Friendly</h3>
										<p className="text-base-content/70">
											Built with modern technologies. Easy to customize and extend.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="card bg-base-100 shadow-xl">
							<div className="card-body">
								<pre className="bg-base-200 rounded-lg p-4 text-sm">
									<code>
										# Clone the repository{'\n'}
										git clone https://github.com/yourusername/yourrepo{'\n\n'}# Install dependencies{'\n'}
										npm install{'\n\n'}# Start the application{'\n'}
										npm run dev
									</code>
								</pre>
								<div className="card-actions justify-end mt-4">
									<a
										href="https://github.com/yourusername/yourrepo"
										className="btn btn-primary btn-sm gap-2"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Github className="w-4 h-4" />
										View Documentation
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Your existing Benefits Section */}

			{/* Updated CTA Section */}
			<section className="py-24">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Join Our Open Source Community</h2>
					<p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
						Be part of the future of hiring technology. Contribute, customize, and build with us.
					</p>
					<div className="flex justify-center gap-4">
						<GoogleSignIn />
						<a
							href="https://github.com/yourusername/yourrepo"
							className="btn btn-outline gap-2"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="w-4 h-4" />
							Star on GitHub
						</a>
					</div>
				</div>
			</section>

			<footer className="bg-base-200">
				<div className="max-w-6xl mx-auto px-4">
					<div className="max-w-6xl mx-auto px-4">
						<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/70">
							<div className="flex items-center gap-2">
								<div className="avatar">
									<div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
										<img src="/api/placeholder/32/32" alt="Author" />
									</div>
								</div>
								<span>
									Built with ❤️ by{' '}
									<a
										href="https://your-website.com"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:text-primary/80 font-medium transition-colors"
									>
										Manish Saraan
									</a>
								</span>
							</div>

							<div className="flex items-center gap-6">
								<a
									href="https://twitter.com/yourusername"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-colors"
								>
									Twitter
								</a>
								<a
									href="https://github.com/yourusername"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-colors"
								>
									GitHub
								</a>
								<a
									href="https://linkedin.com/in/yourusername"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-colors"
								>
									LinkedIn
								</a>
							</div>
						</div>
					</div>

					<div className="border-t border-base-300 py-6 text-sm text-center text-base-content/60">
						<p>© {new Date().getFullYear()} ApplicantAI. Open Source Project under MIT License</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
