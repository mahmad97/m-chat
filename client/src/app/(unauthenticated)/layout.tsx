import type { ReactElement, ReactNode } from 'react';

type UnauthenticatedLayoutProps = Readonly<{
	children: ReactNode;
}>;

const UnauthenticatedLayout = (
	props: UnauthenticatedLayoutProps
): ReactElement => {
	return <div className='w-96 m-auto my-4 p-4'>{props.children}</div>;
};

export default UnauthenticatedLayout;
