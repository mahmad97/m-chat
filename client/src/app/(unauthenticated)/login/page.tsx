import type { ReactElement } from 'react';

import { Heading } from 'components/Typography';

import LoginForm from './LoginForm';

const LoginPage = (): ReactElement => {
	return (
		<>
			<Heading>Login</Heading>
			<LoginForm />
		</>
	);
};

export default LoginPage;
