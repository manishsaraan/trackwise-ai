import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
	theme: {
		extend: {
			fontFamily: {
				heading: ['var(--font-cabinet)', 'Inter', 'sans-serif'],
				body: ['var(--font-jakarta)', 'Open Sans', 'sans-serif'],
			},
			colors: {
				// Custom colors for specific cases
				text: {
					primary: '#0F172A',
					secondary: '#334155',
					body: '#475569',
					muted: '#64748B',
				},
				status: {
					'ai-approved': '#059669',
					'in-review': '#D97706',
					rejected: '#DC2626',
				},
			},
		},
	},
	plugins: [daisyui],

  daisyui: {
		themes: [
			{
				light: {
					primary: '#2563EB',
					'primary-content': '#ffffff',
					secondary: '#7C3AED',
					accent: '#059669',
					neutral: '#0F172A',
					'base-100': '#ffffff',
					'base-200': '#F8FAFC',
					'base-300': '#E2E8F0',
					'base-400': '#CBD5E1',
					'base-500': '#94A3B8',
					'base-600': '#64748B',
					'base-700': '#475569',
					'base-800': '#334155',
					'base-900': '#0F172A',
					'base-content': '#0F172A',
					info: '#2563EB',
					success: '#059669',
					warning: '#D97706',
					error: '#DC2626',
				},
			},
		],
	},
} satisfies Config;