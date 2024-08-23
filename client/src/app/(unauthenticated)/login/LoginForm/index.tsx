'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ReactElement } from 'react';

import Button from 'components/Button';
import InputField from 'components/InputField';

import { schema } from './schema';

type Schema = z.infer<typeof schema>;

const LoginForm = (): ReactElement => {
	// const [state, formAction] = useActionState(createTodo, initialState);
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
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
				onSubmit={form.handleSubmit(onSubmit)}
				noValidate>
				<InputField id='login-email' name='email' type='email' label='Email' />

				<InputField
					id='login-password'
					name='password'
					type='password'
					label='Password'
				/>

				<Button id='login-submit' name='submit' type='submit'>
					Login
				</Button>
			</form>
		</FormProvider>
	);
};

export default LoginForm;
