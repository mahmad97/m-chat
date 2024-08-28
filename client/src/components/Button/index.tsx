import type { ReactElement, ReactNode } from 'react';

import { buttonTextStyle } from 'components/Typography';

type ButtonProps = Readonly<{
	id: string;
	type: 'submit';
	name: string;
	disabled?: boolean;
	children: ReactNode;
}>;

const Button = (props: ButtonProps): ReactElement => {
	const backgroundStyle =
		'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 disabled:bg-violet-300';

	return (
		<button
			id={props.id}
			type={props.type}
			name={props.name}
			disabled={props.disabled}
			className={`py-2 px-4 ${backgroundStyle} ${buttonTextStyle} rounded-md`}>
			{props.children}
		</button>
	);
};

export default Button;
