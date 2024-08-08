import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'selector',
	theme: {
		extend: {},
		fontFamily: {
			sans: ['var(--font-inter)'],
		},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1024x',
			xl: '1440px',
		},
	},
	plugins: [],
};

export default config;
