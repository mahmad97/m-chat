import type { ReactElement, ReactNode } from 'react';

type TypographyProps = Readonly<{
	children: ReactNode;
}>;

const headingTextStyle =
	'text-2xl font-extrabold text-slate-800 dark:text-slate-200';

const labelTextStyle = 'text-base font-bold text-slate-700 dark:text-slate-300';

const inputTextStyle =
	'text-base font-normal text-slate-700 dark:text-slate-300';

const errorTextStyle = 'text-xs font-medium text-red-500';

const buttonTextStyle = 'text-base font-bold text-slate-100';

const Heading = (props: TypographyProps): ReactElement => {
	return (
		<h1 className={`inline-block ${headingTextStyle}`}>{props.children}</h1>
	);
};

const ErrorText = (props: TypographyProps): ReactElement => {
	return <p className={`inline-block ${errorTextStyle}`}>{props.children}</p>;
};

export {
	headingTextStyle,
	labelTextStyle,
	inputTextStyle,
	errorTextStyle,
	buttonTextStyle,
	Heading,
	ErrorText,
};
