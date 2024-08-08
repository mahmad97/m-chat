import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from 'components/Navbar';

import './globals.css';

const metadata: Metadata = {
	title: 'm-chat',
	description: 'Chatting app made by Mohammad',
};

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang='en' className={`${inter.variable}`}>
			<body className='bg-slate-100 dark:bg-slate-800'>
				<Navbar />
				<div>{children}</div>
			</body>
		</html>
	);
};

export default RootLayout;
export { metadata };
