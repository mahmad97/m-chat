'use client';

import type { FormEvent, ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from 'components/Button';
import InputField from 'components/InputField';
import PasswordVisibilityToggle from 'components/PasswordVisibilityToggle';
import { submitSignupForm } from 'lib/actions/submitSignupForm';
import { signupFormSchema } from 'lib/schemas/signupFormSchema';

type FieldName = 'email' | 'password';

type Schema = z.infer<typeof signupFormSchema>;

const SignupForm = (): ReactElement => {
	const [state, formAction, isPending] = useActionState(submitSignupForm, {
		success: false,
		message: '',
	});
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<Schema>({
		resolver: zodResolver(signupFormSchema),
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		if (!state.message) return;
		if (!state.success && state.errors) {
			const errors = state.errors;
			const parsedErrors = errors.filter(
				(item, index) =>
					errors.findIndex((elem) => elem.name === item.name) === index
			);

			parsedErrors.forEach(({ name, type, message }) => {
				if (!(name in form.formState.errors)) {
					form.setError(name as FieldName, { type, message });
				}
			});
		}
	}, [state, form]);

	const onFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (!isPending) {
			void form.handleSubmit(() => {
				if (formRef.current) {
					formAction(new FormData(formRef.current));
				}
			})(event);
		}
	};

	return (
		<FormProvider {...form}>
			<form
				ref={formRef}
				className='mt-4 flex flex-col gap-4'
				onSubmit={onFormSubmit}
				noValidate>
				<InputField id='signup-email' name='email' type='text' label='Email' />

				<InputField
					id='signup-password'
					name='password'
					type={showPassword ? 'text' : 'password'}
					label='Password'
					suffixElement={
						<PasswordVisibilityToggle
							showPassword={showPassword}
							setShowPassword={setShowPassword}
						/>
					}
				/>

				<InputField
					id='signup-confirmPassword'
					name='confirmPassword'
					type={showConfirmPassword ? 'text' : 'password'}
					label='Confirm Password'
					suffixElement={
						<PasswordVisibilityToggle
							showPassword={showConfirmPassword}
							setShowPassword={setShowConfirmPassword}
						/>
					}
				/>

				<Button id='signup-submit' name='submit' type='submit'>
					Signup
				</Button>
			</form>
		</FormProvider>
	);
};

export default SignupForm;
