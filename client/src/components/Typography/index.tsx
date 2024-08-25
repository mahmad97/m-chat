import type { ReactElement, ReactNode } from 'react';

type TypographyProps = Readonly<{
	children: ReactNode;
	className?: string;
}>;

const headingTextStyle =
	'text-2xl font-extrabold text-neutral-800 dark:text-neutral-200';

const smallTextStyle =
	'text-xs font-normal text-neutral-600 dark:text-neutral-400';

const smallLinkTextStyle = 'text-xs font-normal text-blue-500 hover:underline';

const labelTextStyle =
	'text-base font-bold text-neutral-700 dark:text-neutral-300';

const inputTextStyle =
	'text-base font-normal text-neutral-700 dark:text-neutral-300';

const errorTextStyle = 'text-xs font-medium text-red-500';

const buttonTextStyle = 'text-base font-bold text-neutral-100';

const Heading = (props: TypographyProps): ReactElement => {
	return (
		<h1 className={`inline-block ${headingTextStyle} ${props.className ?? ''}`}>
			{props.children}
		</h1>
	);
};

const SmallText = (props: TypographyProps): ReactElement => {
	return (
		<h1 className={`inline-block ${smallTextStyle} ${props.className ?? ''}`}>
			{props.children}
		</h1>
	);
};

const SmallLinkText = (props: TypographyProps): ReactElement => {
	return (
		<h1
			className={`inline-block ${smallLinkTextStyle} ${props.className ?? ''}`}>
			{props.children}
		</h1>
	);
};

const ErrorText = (props: TypographyProps): ReactElement => {
	return (
		<p className={`inline-block ${errorTextStyle} ${props.className ?? ''}`}>
			{props.children}
		</p>
	);
};

export {
	headingTextStyle,
	smallTextStyle,
	smallLinkTextStyle,
	labelTextStyle,
	inputTextStyle,
	errorTextStyle,
	buttonTextStyle,
	Heading,
	SmallText,
	SmallLinkText,
	ErrorText,
};
