import type { Metadata } from 'next';
import './globals.css';

const metadata: Metadata = {
	title: 'm-chat',
	description: 'Chatting app made by Mohammad',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
export { metadata };
