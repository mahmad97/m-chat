import type { ReactElement } from 'react';

import Link from 'next/link';

import { SmallLinkText, SmallText } from 'components/Typography';

const HelpfulLinks = (): ReactElement => {
	return (
		<div className='mt-4 flex flex-col'>
			<div>
				<SmallText className='whitespace-pre'>{`Don't have an account? `}</SmallText>
				<Link href='/signup'>
					<SmallLinkText>{'Signup'}</SmallLinkText>
				</Link>
			</div>
			<div>
				<SmallText className='whitespace-pre'>
					{'Forgot your password? '}
				</SmallText>
				<Link href='/'>
					<SmallLinkText>{'Password recovery'}</SmallLinkText>
				</Link>
			</div>
		</div>
	);
};

export default HelpfulLinks;
