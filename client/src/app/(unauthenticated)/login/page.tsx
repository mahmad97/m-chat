import type { ReactElement } from 'react';

import { Heading } from 'components/Typography';

import HelpfulLinks from './HelpfulLinks';
import LoginForm from './LoginForm';

const LoginPage = (): ReactElement => {
	return (
		<>
			<Heading>{'Login'}</Heading>
			<LoginForm />
			<HelpfulLinks />
		</>
	);
};

export default LoginPage;
