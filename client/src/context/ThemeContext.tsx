type Theme = 'light' | 'dark' | 'system';
type DocTheme = 'light' | 'dark';

const setDocTheme = (newTheme: DocTheme): void => {
	if (newTheme === 'dark') document.documentElement.classList.add('dark');
	else document.documentElement.classList.remove('dark');
};

const onStorageThemeChange = (
	event: StorageEvent,
	listener: () => void
): void => {
	if (event.key !== 'theme') return;

	const newTheme = event.newValue;

	if (newTheme === 'light' || newTheme === 'dark') setDocTheme(newTheme);
	else {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light';
		setDocTheme(systemTheme);
	}

	listener();
};

const onSystemThemeChange = (
	event: MediaQueryListEvent,
	listener: () => void
): void => {
	const theme = window.localStorage.getItem('theme');
	if (theme === 'light' || theme === 'dark') return;

	const systemTheme = event.matches ? 'dark' : 'light';
	setDocTheme(systemTheme);

	listener();
};

const ThemeContext = {
	setTheme: (newValue: Theme) => {
		window.localStorage.setItem('theme', newValue);
		window.dispatchEvent(
			new StorageEvent('storage', { key: 'theme', newValue })
		);
	},
	getSnapshot: () => localStorage.getItem('theme'),
	subscribe: (listener: () => void) => {
		let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		window.addEventListener('storage', (event) =>
			onStorageThemeChange(event, listener)
		);
		mediaQuery.addEventListener('change', (event) => {
			onSystemThemeChange(event, listener);
		});
		return () => {
			window.removeEventListener('storage', (event) => {
				onStorageThemeChange(event, listener);
			});
			mediaQuery.removeEventListener('change', (event) => {
				onSystemThemeChange(event, listener);
			});
		};
	},
	getServerSnapshot: () => 'system',
};

export default ThemeContext;
