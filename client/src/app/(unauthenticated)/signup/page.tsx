import type { ReactElement } from 'react';

import { Heading } from 'components/Typography';

import HelpfulLinks from './HelpfulLinks';
import SignupForm from './SignupForm';

const SignupPage = (): ReactElement => {
	return (
		<>
			<Heading>{'Signup'}</Heading>
			<SignupForm />
			<HelpfulLinks />
		</>
	);
};

export default SignupPage;
