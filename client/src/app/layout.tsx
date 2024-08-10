import { Inter } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

import TopBar from 'components/Topbar';

import './globals.css';

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const metadata: Metadata = {
	title: 'm-chat',
	description: 'Chatting app made by Mohammad',
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const RootLayout = (props: RootLayoutProps): ReactElement => {
	return (
		<html lang='en' className={`${inter.variable}`}>
			<body className='bg-slate-100 dark:bg-slate-800'>
				<Script
					id='set-theme'
					dangerouslySetInnerHTML={{
						__html: `
                function setTheme(newTheme) {
                  if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
                
                var preferredTheme = null;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (_) {}
                
                if (preferredTheme && (preferredTheme === 'dark' || preferredTheme === 'light')) {
                  setTheme(preferredTheme);
                } else {
                  localStorage.setItem('theme', 'system');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  setTheme(systemTheme);
                }
            `,
					}}
				/>
				<TopBar />
				{props.children}
			</body>
		</html>
	);
};

export default RootLayout;
export { metadata };
