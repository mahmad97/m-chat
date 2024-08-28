'use client';

import type { ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from 'components/Button';
import InputField from 'components/InputField';
import PasswordVisibilityToggle from 'components/PasswordVisibilityToggle';
import { signupFormSchema } from 'lib/schemas/signupFormSchema';

type Schema = z.infer<typeof signupFormSchema>;

const SignupForm = (): ReactElement => {
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

	const onSubmit = (data: Schema) => {
		console.log(data);
	};

	return (
		<FormProvider {...form}>
			<form
				className='mt-4 flex flex-col gap-4'
				onSubmit={() => form.handleSubmit(onSubmit)}
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
