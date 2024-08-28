'use client';

import type { ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from 'components/Button';
import InputField from 'components/InputField';
import PasswordVisibilityToggle from 'components/PasswordVisibilityToggle';
import { submitLoginForm } from 'lib/actions/submitLoginForm';
import { loginFormSchema } from 'lib/schemas/loginFormSchema';

type Schema = z.infer<typeof loginFormSchema>;

const LoginForm = (): ReactElement => {
	// const [state, formAction] = useActionState(createTodo, initialState);
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<Schema>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: Schema) => {
		console.log(data);
	};
	// const { pending } = useFormStatus();

	return (
		<FormProvider {...form}>
			<form
				className='mt-4 flex flex-col gap-4'
				onSubmit={() => form.handleSubmit(onSubmit)}
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

				<Button id='login-submit' name='submit' type='submit'>
					{'Login'}
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
