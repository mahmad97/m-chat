'use client';

import type { ReactElement } from 'react';

import { useTheme } from 'lib/hooks/useTheme';

const ThemeToggle = (): ReactElement => {
	const [theme, setTheme] = useTheme();

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
			{theme}
			<button onClick={handleOnClickLight}>Light</button>
			<button onClick={handleOnClickDark}>Dark</button>
			<button onClick={handleOnClickSystem}>System</button>
		</>
	);
};

export default ThemeToggle;
