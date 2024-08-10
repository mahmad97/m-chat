'use client';

import { useEffect, useState } from 'react';

import type { ReactElement } from 'react';

type Theme = string | null;

const setDocTheme = (newTheme: Theme): void => {
	if (newTheme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

const ThemeToggle = (): ReactElement => {
	const [theme, setTheme] = useState<Theme>('system');

	useEffect(() => {
		const storageTheme: Theme = localStorage.getItem('theme');
		if (storageTheme === 'light' || storageTheme === 'dark') {
			setTheme(storageTheme);
		} else {
			setTheme('system');
		}
	}, []);

	useEffect(() => {
		let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const getSystemTheme = (e: MediaQueryListEvent) => {
			const systemTheme = e.matches ? 'dark' : 'light';
			setDocTheme(systemTheme);
		};

		mediaQuery.addEventListener('change', getSystemTheme);

		return () => {
			mediaQuery.removeEventListener('change', getSystemTheme);
		};
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme || 'system');

		if (theme === 'dark' || theme === 'light') {
			setDocTheme(theme);
		} else {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? 'dark'
				: 'light';
			setDocTheme(systemTheme);
		}
	}, [theme]);

	const handleOnClickLight = () => {
		setTheme('light');
	};

	const handleOnClickDark = () => {
		setTheme('dark');
	};

	const handleOnClickSystem = () => {
		setTheme('system');
	};

	return (
		<>
			<button onClick={handleOnClickLight}>Light</button>
			<button onClick={handleOnClickDark}>Dark</button>
			<button onClick={handleOnClickSystem}>System</button>
		</>
	);
};

export default ThemeToggle;
