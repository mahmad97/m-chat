import type { ReactElement } from 'react';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
	ErrorText,
	inputTextStyle,
	labelTextStyle,
} from 'components/Typography';

type InputFieldProps = Readonly<{
	id: string;
	type: 'password' | 'text';
	name: string;
	label?: string;
	placeholder?: string;
	prefixElement?: ReactElement;
	suffixElement?: ReactElement;
}>;

const InputField = (props: InputFieldProps): ReactElement => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const errorMessage = errors[props.name]?.message;

	useEffect(() => {
		const input = document.getElementById(props.id);

		if (!input || input.tagName !== 'INPUT') return;

		if (errorMessage) {
			(input as HTMLInputElement).setCustomValidity('error');
		} else {
			(input as HTMLInputElement).setCustomValidity('');
		}
	}, [errorMessage, props.id]);

	const leftPad = props.prefixElement ? 'pl-2' : 'pl-4';
	const rightPad = props.suffixElement ? 'pr-2' : 'pr-4';

	const backgroundStyle = 'bg-slate-100 dark:bg-slate-900';
	const containerBorderStyle =
		'border border-slate-300 dark:border-slate-700 has-[:invalid]:border-red-500 has-[:focus]:border-violet-500 rounded-md';
	const inputCssBoxStyle = `py-2 ${leftPad} ${rightPad}`;
	const inputBorderStyle = 'border-none outline-none rounded-md';

	return (
		<div className='flex flex-col'>
			{props.label && (
				<label htmlFor={props.id} className={labelTextStyle}>
					{props.label}
				</label>
			)}
			<div
				className={`flex items-center mt-1 ${backgroundStyle} ${containerBorderStyle}`}>
				{props.prefixElement && props.prefixElement}
				<input
					id={props.id}
					{...register(props.name)}
					type={props.type}
					placeholder={props.placeholder}
					className={`flex-auto bg-inherit ${inputCssBoxStyle} ${inputBorderStyle} ${inputTextStyle}`}
				/>
				{props.suffixElement && props.suffixElement}
			</div>
			{errorMessage && typeof errorMessage === 'string' ? (
				<ErrorText>{errorMessage}</ErrorText>
			) : (
				<span className='h-4'></span>
			)}
		</div>
	);
};

export default InputField;
