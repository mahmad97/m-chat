'use client';

import type { FormEvent, ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from 'components/Button';
import InputField from 'components/InputField';
import PasswordVisibilityToggle from 'components/PasswordVisibilityToggle';
import { submitLoginForm } from 'lib/actions/submitLoginForm';
import { loginFormSchema } from 'lib/schemas/loginFormSchema';

type FieldName = 'email' | 'password';

type Schema = z.infer<typeof loginFormSchema>;

const LoginForm = (): ReactElement => {
	const [state, formAction, isPending] = useActionState(submitLoginForm, {
		success: false,
		message: '',
	});
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<Schema>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

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

		if (state.success) {
			router.push('/');
		}
	}, [state, form, router]);

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
				<InputField id='login-email' name='email' type='text' label='Email' />

				<InputField
					id='login-password'
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

				<Button
					id='login-submit'
					name='submit'
					type='submit'
					disabled={isPending}>
					{'Login'}
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
