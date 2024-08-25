import type { ReactElement } from 'react';

import Link from 'next/link';

import { SmallLinkText, SmallText } from 'components/Typography';

const HelpfulLinks = (): ReactElement => {
	return (
		<div className='mt-4'>
			<SmallText className='whitespace-pre'>
				{'Already have an account? '}
			</SmallText>
			<Link href='/login'>
				<SmallLinkText>{'Login'}</SmallLinkText>
			</Link>
		</div>
	);
};

export default HelpfulLinks;
