import { useEffect, type ReactElement } from 'react';

import { useFormContext } from 'react-hook-form';

import {
	ErrorText,
	inputTextStyle,
	labelTextStyle,
} from 'components/Typography';

type InputFieldProps = Readonly<{
	id: string;
	type: 'email' | 'password';
	name: string;
	label?: string;
	placeholder?: string;
}>;

const InputField = (props: InputFieldProps): ReactElement => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	useEffect(() => {
		const input = document.getElementById(props.id);

		if (!input || input.tagName !== 'INPUT') return;

		errors[props.name]
			? (input as HTMLInputElement).setCustomValidity('error')
			: (input as HTMLInputElement).setCustomValidity('');
	}, [errors[props.name]]);

	const cssBoxStyle = 'mt-1 py-2 px-4';
	const backgroundStyle = 'bg-slate-100 dark:bg-slate-900';
	const borderStyle =
		'border border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:outline-none invalid:border-red-500 rounded-md';

	return (
		<div className='flex flex-col'>
			{props.label && (
				<label htmlFor={props.id} className={`${labelTextStyle}`}>
					{props.label}
				</label>
			)}
			<input
				id={props.id}
				{...register(props.name)}
				type={props.type}
				placeholder={props.placeholder}
				className={`${cssBoxStyle} ${backgroundStyle} ${inputTextStyle} ${borderStyle}`}
			/>
			{errors[props.name] && (
				<ErrorText>{`${errors[props.name]?.message}`}</ErrorText>
			)}
		</div>
	);
};

export default InputField;
