'use client';
import React from 'react';
import { motion } from 'framer-motion';

import GoogleSignIn from '@/app/components/ui/GoogleSignIn';
import { Brain, CheckCircle, Clock, Code2, Github, LineChart, Search, Star, Users, Zap } from 'lucide-react';

const LandingPage = () => {
	const heroContentVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const featureCardVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.4, ease: 'easeOut' },
		},
	};

	const openSourceVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	return (
		<div className="min-h-screen bg-base-100">
			{/* Hero Section - Enhanced */}
			<section className="hero min-h-[85vh] bg-gradient-to-b from-primary/5 via-base-100/50 to-base-100">
				<div className="hero-content text-center">
					<motion.div className="max-w-4xl" variants={heroContentVariants} initial="hidden" animate="visible">
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
					</motion.div>
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
						{/* Technology Icons */}
						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16  rounded-lg flex items-center justify-center p-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
									<path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
								</svg>
							</div>
							<span className="text-sm font-medium">Next.js 14</span>
						</motion.div>

						{/* TypeScript */}
						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16   rounded-lg flex items-center justify-center p-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
									<path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" />
									<path
										data-name="original"
										fill="#007acc"
										d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
									/>
								</svg>
							</div>
							<span className="text-sm font-medium">TypeScript</span>
						</motion.div>
						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16  rounded-lg flex items-center justify-center p-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
									<path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.543-56.287-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.209 5.214.558 10.079 1.621 12.948 1.063 2.868 2.317 10.256 12.191 8.14 8.252-1.764 14.561-4.309 15.136-27.985" />
									<path d="M75.458 125.256c-4.367 0-7.211-1.689-8.938-3.32-2.607-2.46-3.641-5.629-4.259-7.522l-.267-.79c-1.244-3.358-1.666-8.193-1.916-14.419-.038-.935-.064-1.898-.093-2.919-.021-.747-.047-1.684-.085-2.664a18.8 18.8 0 01-4.962 1.568c-3.079.526-6.389.356-9.84-.507-2.435-.609-4.965-1.871-6.407-3.82-4.203 3.681-8.212 3.182-10.396 2.453-3.853-1.285-7.301-4.896-10.542-11.037-2.309-4.375-4.542-10.075-6.638-16.943-3.65-11.96-5.969-24.557-6.175-28.693C4.292 23.698 7.777 14.44 15.296 9.129 27.157.751 45.128 5.678 51.68 7.915c4.402-2.653 9.581-3.944 15.433-3.851 3.143.051 6.136.327 8.916.823 2.9-.912 8.628-2.221 15.185-2.139 12.081.144 22.092 4.852 28.949 13.615 4.894 6.252 2.474 19.381.597 26.651-2.642 10.226-7.271 21.102-12.957 30.57 1.544.011 3.781-.174 6.961-.831 6.274-1.295 8.109 2.069 8.607 3.575 1.995 6.042-6.677 10.608-9.382 11.864-3.466 1.609-9.117 2.589-13.745 2.377l-.202-.013-1.216-.107-.12 1.014-.116.991c-.311 11.999-2.025 19.598-5.552 24.619-3.697 5.264-8.835 6.739-13.361 7.709-1.544.33-2.947.474-4.219.474zm-9.19-43.671c2.819 2.256 3.066 6.501 3.287 14.434.028.99.054 1.927.089 2.802.106 2.65.355 8.855 1.327 11.477.137.371.26.747.39 1.146 1.083 3.316 1.626 4.979 6.309 3.978 3.931-.843 5.952-1.599 7.534-3.851 2.299-3.274 3.585-9.86 3.821-19.575l4.783.116-4.75-.57.14-1.186c.455-3.91.783-6.734 3.396-8.602 2.097-1.498 4.486-1.353 6.389-1.01-2.091-1.58-2.669-3.433-2.823-4.193l-.399-1.965 1.121-1.663c6.457-9.58 11.781-21.354 14.609-32.304 2.906-11.251 2.02-17.226 1.134-18.356-11.729-14.987-32.068-8.799-34.192-8.097l-.359.194-1.8.335-.922-.191c-2.542-.528-5.366-.82-8.393-.869-4.756-.08-8.593 1.044-11.739 3.431l-2.183 1.655-2.533-1.043c-5.412-2.213-21.308-6.662-29.696-.721-4.656 3.298-6.777 9.76-6.305 19.207.156 3.119 2.275 14.926 5.771 26.377 4.831 15.825 9.221 21.082 11.054 21.693.32.108 1.15-.537 1.976-1.529a270.708 270.708 0 0110.694-12.07l2.77-2.915 3.349 2.225c1.35.897 2.839 1.406 4.368 1.502l7.987-6.812-1.157 11.808c-.026.265-.039.626.065 1.296l.348 2.238-1.51 1.688-.174.196 4.388 2.025 1.836-2.301z" />
									<path
										fill="#336791"
										d="M115.731 77.44c-13.925 2.873-14.882-1.842-14.882-1.842 14.703-21.816 20.849-49.51 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967-6.301-.103-11.08 1.652-14.707 4.402 0 0-44.684-18.408-42.606 23.151.442 8.842 12.672 66.899 27.26 49.363 5.332-6.412 10.483-11.834 10.483-11.834 2.559 1.699 5.622 2.567 8.833 2.255l.25-.212c-.078.796-.042 1.575.1 2.497-3.758 4.199-2.654 4.936-10.167 6.482-7.602 1.566-3.136 4.355-.22 5.084 3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.18 2.507 7.672 2.334 13.557-.174 5.885-.29 9.926.871 13.082 1.16 3.156 2.316 10.256 12.192 8.14 8.252-1.768 12.528-6.351 13.124-13.995.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.639-.602 11.514-1.938 6.19-2.871 9.861-7.667 3.758-6.408z"
									/>
									<path
										fill="#fff"
										d="M75.957 122.307c-8.232 0-10.84-6.519-11.907-9.185-1.562-3.907-1.899-19.069-1.551-31.503a1.59 1.59 0 011.64-1.55 1.594 1.594 0 011.55 1.639c-.401 14.341.168 27.337 1.324 30.229 1.804 4.509 4.54 8.453 12.275 6.796 7.343-1.575 10.093-4.359 11.318-11.46.94-5.449 2.799-20.951 3.028-24.01a1.593 1.593 0 011.71-1.472 1.597 1.597 0 011.472 1.71c-.239 3.185-2.089 18.657-3.065 24.315-1.446 8.387-5.185 12.191-13.794 14.037-1.463.313-2.792.453-4 .454zM31.321 90.466a6.71 6.71 0 01-2.116-.35c-5.347-1.784-10.44-10.492-15.138-25.885-3.576-11.717-5.842-23.947-6.041-27.922-.589-11.784 2.445-20.121 9.02-24.778 13.007-9.216 34.888-.44 35.813-.062a1.596 1.596 0 01-1.207 2.955c-.211-.086-21.193-8.492-32.768-.285-5.622 3.986-8.203 11.392-7.672 22.011.167 3.349 2.284 15.285 5.906 27.149 4.194 13.742 8.967 22.413 13.096 23.79.648.216 2.62.873 5.439-2.517A245.272 245.272 0 0145.88 73.046a1.596 1.596 0 012.304 2.208c-.048.05-4.847 5.067-10.077 11.359-2.477 2.979-4.851 3.853-6.786 3.853zm69.429-13.445a1.596 1.596 0 01-1.322-2.487c14.863-22.055 20.08-48.704 15.612-54.414-5.624-7.186-13.565-10.939-23.604-11.156-7.433-.16-13.341 1.738-14.307 2.069l-.243.099c-.971.305-1.716-.227-1.997-.849a1.6 1.6 0 01.631-2.025c.046-.027.192-.089.429-.176l-.021.006.021-.007c1.641-.601 7.639-2.4 15.068-2.315 11.108.118 20.284 4.401 26.534 12.388 2.957 3.779 2.964 12.485.019 23.887-3.002 11.625-8.651 24.118-15.497 34.277-.306.457-.81.703-1.323.703zm.76 10.21c-2.538 0-4.813-.358-6.175-1.174-1.4-.839-1.667-1.979-1.702-2.584-.382-6.71 3.32-7.878 5.208-8.411-.263-.398-.637-.866-1.024-1.349-1.101-1.376-2.609-3.26-3.771-6.078-.182-.44-.752-1.463-1.412-2.648-3.579-6.418-11.026-19.773-6.242-26.612 2.214-3.165 6.623-4.411 13.119-3.716C97.6 28.837 88.5 10.625 66.907 10.271c-6.494-.108-11.82 1.889-15.822 5.93-8.96 9.049-8.636 25.422-8.631 25.586a1.595 1.595 0 11-3.19.084c-.02-.727-.354-17.909 9.554-27.916C53.455 9.272 59.559 6.96 66.96 7.081c13.814.227 22.706 7.25 27.732 13.101 5.479 6.377 8.165 13.411 8.386 15.759.165 1.746-1.088 2.095-1.341 2.147l-.576.013c-6.375-1.021-10.465-.312-12.156 2.104-3.639 5.201 3.406 17.834 6.414 23.229.768 1.376 1.322 2.371 1.576 2.985.988 2.396 2.277 4.006 3.312 5.3.911 1.138 1.7 2.125 1.982 3.283.131.23 1.99 2.98 13.021.703 2.765-.57 4.423-.083 4.93 1.45.997 3.015-4.597 6.532-7.694 7.97-2.775 1.29-7.204 2.106-11.036 2.106zm-4.696-4.021c.35.353 2.101.962 5.727.806 3.224-.138 6.624-.839 8.664-1.786 2.609-1.212 4.351-2.567 5.253-3.492l-.5.092c-7.053 1.456-12.042 1.262-14.828-.577a6.162 6.162 0 01-.54-.401c-.302.119-.581.197-.78.253-1.58.443-3.214.902-2.996 5.105zm-45.562 8.915c-1.752 0-3.596-.239-5.479-.71-1.951-.488-5.24-1.957-5.19-4.37.057-2.707 3.994-3.519 5.476-3.824 5.354-1.103 5.703-1.545 7.376-3.67.488-.619 1.095-1.39 1.923-2.314 1.229-1.376 2.572-2.073 3.992-2.073.989 0 1.8.335 2.336.558 1.708.708 3.133 2.42 3.719 4.467.529 1.847.276 3.625-.71 5.006-3.237 4.533-7.886 6.93-13.443 6.93zm-7.222-4.943c.481.372 1.445.869 2.518 1.137 1.631.408 3.213.615 4.705.615 4.546 0 8.196-1.882 10.847-5.594.553-.774.387-1.757.239-2.274-.31-1.083-1.08-2.068-1.873-2.397-.43-.178-.787-.314-1.115-.314-.176 0-.712 0-1.614 1.009a41.146 41.146 0 00-1.794 2.162c-2.084 2.646-3.039 3.544-9.239 4.821-1.513.31-2.289.626-2.674.835zm12.269-7.36a1.596 1.596 0 01-1.575-1.354 8.218 8.218 0 01-.08-.799c-4.064-.076-7.985-1.82-10.962-4.926-3.764-3.927-5.477-9.368-4.699-14.927.845-6.037.529-11.366.359-14.229-.047-.796-.081-1.371-.079-1.769.003-.505.013-1.844 4.489-4.113 1.592-.807 4.784-2.215 8.271-2.576 5.777-.597 9.585 1.976 10.725 7.246 3.077 14.228.244 20.521-1.825 25.117-.385.856-.749 1.664-1.04 2.447l-.257.69c-1.093 2.931-2.038 5.463-1.748 7.354a1.595 1.595 0 01-1.335 1.819l-.244.02zM42.464 42.26l.062 1.139c.176 2.974.504 8.508-.384 14.86-.641 4.585.759 9.06 3.843 12.276 2.437 2.542 5.644 3.945 8.94 3.945h.068c.369-1.555.982-3.197 1.642-4.966l.255-.686c.329-.884.714-1.74 1.122-2.646 1.991-4.424 4.47-9.931 1.615-23.132-.565-2.615-1.936-4.128-4.189-4.627-4.628-1.022-11.525 2.459-12.974 3.837zm9.63-.677c-.08.564 1.033 2.07 2.485 2.271 1.449.203 2.689-.975 2.768-1.539.079-.564-1.033-1.186-2.485-1.388-1.451-.202-2.691.092-2.768.656zm2.818 2.826l-.407-.028c-.9-.125-1.81-.692-2.433-1.518-.219-.29-.576-.852-.505-1.354.101-.736.999-1.177 2.4-1.177.313 0 .639.023.967.069.766.106 1.477.327 2.002.62.91.508.977 1.075.936 1.368-.112.813-1.405 2.02-2.96 2.02zm-2.289-2.732c.045.348.907 1.496 2.029 1.651l.261.018c1.036 0 1.81-.815 1.901-1.082-.096-.182-.762-.634-2.025-.81a5.823 5.823 0 00-.821-.059c-.812 0-1.243.183-1.345.282zm43.605-1.245c.079.564-1.033 2.07-2.484 2.272-1.45.202-2.691-.975-2.771-1.539-.076-.564 1.036-1.187 2.486-1.388 1.45-.203 2.689.092 2.769.655zm-2.819 2.56c-1.396 0-2.601-1.086-2.7-1.791-.115-.846 1.278-1.489 2.712-1.688.316-.044.629-.066.93-.066 1.238 0 2.058.363 2.14.949.053.379-.238.964-.739 1.492-.331.347-1.026.948-1.973 1.079l-.37.025zm.943-3.013c-.276 0-.564.021-.856.061-1.441.201-2.301.779-2.259 1.089.048.341.968 1.332 2.173 1.332l.297-.021c.787-.109 1.378-.623 1.66-.919.443-.465.619-.903.598-1.052-.028-.198-.56-.49-1.613-.49zm3.965 32.843a1.594 1.594 0 01-1.324-2.483c3.398-5.075 2.776-10.25 2.175-15.255-.257-2.132-.521-4.337-.453-6.453.07-2.177.347-3.973.614-5.71.317-2.058.617-4.002.493-6.31a1.595 1.595 0 113.186-.172c.142 2.638-.197 4.838-.525 6.967-.253 1.643-.515 3.342-.578 5.327-.061 1.874.178 3.864.431 5.97.64 5.322 1.365 11.354-2.691 17.411a1.596 1.596 0 01-1.328.708z"
									/>
								</svg>
							</div>
							<span className="text-sm font-medium">PostgreSQL</span>
						</motion.div>
						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16   rounded-lg flex items-center justify-center p-2">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
									<path
										d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
										fill="#38bdf8"
									/>
								</svg>
							</div>
							<span className="text-sm font-medium">PostgreSQL</span>
						</motion.div>

						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16   rounded-lg flex items-center justify-center p-2">
								<svg
									fill="none"
									height="982"
									viewBox="1.372 -.18543865 324.553 128.18543865"
									width="2500"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g fill="#0c344b">
										<path d="m199.202 85.75h8.638v-31.662h-8.638zm-.367-39.847c0-2.813 1.567-4.219 4.701-4.219 3.133 0 4.701 1.406 4.701 4.219 0 1.341-.392 2.384-1.175 3.13-.784.746-1.959 1.118-3.526 1.118-3.134 0-4.701-1.416-4.701-4.248z" />
										<path
											clipRule="evenodd"
											d="m164.253 67.483c2.786-2.36 4.178-5.767 4.178-10.223 0-4.286-1.307-7.51-3.922-9.672-2.615-2.16-6.433-3.242-11.456-3.242h-13.225v41.404h8.779v-14.727h3.767c5.135 0 9.095-1.179 11.879-3.54zm-12.757-3.653h-2.889v-12.29h3.993c2.398 0 4.158.49 5.282 1.472 1.123.982 1.685 2.502 1.685 4.56 0 2.038-.67 3.591-2.011 4.658s-3.36 1.6-6.06 1.6z"
											fillRule="evenodd"
										/>
										<path d="m194.62 53.748c-.774-.17-1.746-.255-2.917-.255-1.964 0-3.781.543-5.451 1.628a11.908 11.908 0 0 0 -3.98 4.291h-.424l-1.275-5.324h-6.542v31.662h8.638v-16.114c0-2.549.769-4.532 2.307-5.948 1.54-1.416 3.687-2.124 6.444-2.124 1.001 0 1.85.095 2.549.283zm40.245 30.02c2.257-1.7 3.385-4.172 3.385-7.42 0-1.567-.273-2.917-.821-4.05-.547-1.133-1.398-2.133-2.549-3.002-1.151-.868-2.964-1.802-5.438-2.803-2.775-1.114-4.573-1.955-5.394-2.521s-1.233-1.236-1.233-2.011c0-1.378 1.275-2.067 3.824-2.067 1.434 0 2.841.217 4.219.65 1.378.436 2.861.992 4.447 1.672l2.605-6.23c-3.606-1.661-7.316-2.492-11.13-2.492-4.003 0-7.093.769-9.273 2.308-2.183 1.539-3.273 3.714-3.273 6.527 0 1.643.26 3.026.78 4.149.518 1.124 1.349 2.12 2.493 2.988 1.14.869 2.931 1.813 5.365 2.832 1.699.718 3.059 1.345 4.079 1.883 1.019.539 1.737 1.02 2.153 1.445.415.425.622.977.622 1.657 0 1.812-1.567 2.718-4.702 2.718-1.529 0-3.299-.255-5.309-.764-2.012-.51-3.819-1.142-5.424-1.898v7.137a22.275 22.275 0 0 0 4.56 1.373c1.624.312 3.587.468 5.891.468 4.492 0 7.867-.85 10.123-2.55zm37.604 1.982h-8.638v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.208 0-3.813.812-4.814 2.436s-1.501 4.295-1.501 8.015v14.896h-8.638v-31.662h6.599l1.161 4.05h.482c.849-1.454 2.077-2.592 3.681-3.413 1.605-.821 3.446-1.232 5.523-1.232 4.739 0 7.948 1.549 9.629 4.645h.764c.85-1.473 2.101-2.615 3.753-3.427s3.516-1.218 5.593-1.218c3.587 0 6.302.921 8.142 2.761 1.841 1.841 2.761 4.791 2.761 8.85v20.646h-8.666v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.114 0-3.695.756-4.744 2.266-1.047 1.511-1.571 3.908-1.571 7.193z" />
										<path
											clipRule="evenodd"
											d="m318.222 81.445 1.671 4.305h6.032v-21.099c0-3.776-1.133-6.589-3.398-8.439-2.266-1.85-5.523-2.776-9.771-2.776-4.436 0-8.477.954-12.121 2.861l2.86 5.834c3.417-1.53 6.391-2.294 8.921-2.294 3.285 0 4.928 1.605 4.928 4.814v1.388l-5.494.17c-4.739.17-8.283 1.053-10.635 2.648-2.35 1.596-3.525 4.074-3.525 7.434 0 3.21.873 5.683 2.619 7.42 1.747 1.737 4.139 2.605 7.18 2.605 2.473 0 4.479-.354 6.017-1.062 1.539-.708 3.035-1.977 4.489-3.809zm-4.22-10.252 3.342-.113v2.605c0 1.908-.6 3.437-1.799 4.588-1.198 1.152-2.799 1.728-4.8 1.728-2.794 0-4.191-1.218-4.191-3.653 0-1.7.613-2.964 1.841-3.795 1.227-.83 3.096-1.284 5.607-1.36zm-218.269 30.336-57.479 17c-1.756.52-3.439-.999-3.07-2.77l20.534-98.34c.384-1.838 2.926-2.13 3.728-.427l38.02 80.736c.717 1.523-.101 3.319-1.733 3.801zm9.857-4.01-44.022-93.482v-.002a7.062 7.062 0 0 0 -6.019-4.022c-2.679-.156-5.079 1.136-6.433 3.335l-47.744 77.33a7.233 7.233 0 0 0 .084 7.763l23.338 36.152c1.391 2.158 3.801 3.407 6.306 3.407.71 0 1.424-.1 2.126-.308l67.744-20.036a7.424 7.424 0 0 0 4.66-4.028 7.264 7.264 0 0 0 -.04-6.11z"
											fillRule="evenodd"
										/>
									</g>
								</svg>
							</div>
							<span className="text-sm font-medium">Prisma</span>
						</motion.div>

						<motion.div
							className="flex flex-col items-center gap-2"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
							<div className="w-16 h-16  rounded-lg flex items-center justify-center p-2">
								<svg
									fill="#000000"
									width="800px"
									height="800px"
									viewBox="0 0 24 24"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>OpenAI icon</title>
									<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
								</svg>
							</div>
							<span className="text-sm font-medium">OpenAI</span>
						</motion.div>
					</div>

					{/* Additional Tech Tags */}
					<div className="flex flex-wrap justify-center gap-2 mt-8">
						<div className="badge badge-outline">React Hook Form</div>
						<div className="badge badge-outline">Stack Auth</div>
						<div className="badge badge-outline">DaisyUI</div>
						<div className="badge badge-outline">Zod</div>
						<div className="badge badge-outline">Upstash</div>
					</div>
				</div>
			</section>

			{/* Features Section - Enhanced Copy */}
			<section className="py-24 bg-base-200">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Feature Cards */}
						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>

						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>

						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>

						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>

						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>

						<motion.div
							className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
							variants={featureCardVariants}
							initial="hidden"
							whileInView="visible"
						>
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
						</motion.div>
						{/* Remaining Feature Cards */}
					</div>
				</div>
			</section>

			{/* Open Source Section - New */}
			<section className="py-24">
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
						<motion.div variants={openSourceVariants} initial="hidden" whileInView="visible">
							{/* Open Source Content */}
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
						</motion.div>

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
					<div className="flex  py-4 flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/70">
						<div className="flex items-center gap-2">
							<div className="avatar">
								<div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
									<img
										src="https://manishsaraan.com/_ipx/w_1920,q_75/%2Fimages%2Fpersonal.jpeg?url=%2Fimages%2Fpersonal.jpeg&w=1920&q=75"
										alt="Author"
									/>
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

					<div className="border-t border-base-300 py-6 text-sm text-center text-base-content/60">
						<p>© {new Date().getFullYear()} TrackWiseAI. Open Source Project by Manish Saraan</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
