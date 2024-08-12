'use client';

import { useSyncExternalStore } from 'react';

import type { ReactElement } from 'react';

import ThemeContext from 'context/ThemeContext';

const ThemeToggle = (): ReactElement => {
	const theme = useSyncExternalStore(
		ThemeContext.subscribe,
		ThemeContext.getSnapshot,
		ThemeContext.getServerSnapshot
	);

	const handleOnClickLight = () => {
		ThemeContext.setTheme('light');
	};

	const handleOnClickDark = () => {
		ThemeContext.setTheme('dark');
	};

	const handleOnClickSystem = () => {
		ThemeContext.setTheme('system');
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
