import type { ReactElement } from 'react';

import VisibilityOffSVG from 'img/icons/visibility_off.icon.svg';
import VisibilityOnSVG from 'img/icons/visibility_on.icon.svg';

type PasswordVisibilityToggleProps = Readonly<{
	showPassword: boolean;
	setShowPassword: (arg0: boolean) => void;
}>;

const PasswordVisibilityToggle = (
	props: PasswordVisibilityToggleProps
): ReactElement => {
	return (
		<div
			className='pr-2 cursor-pointer'
			onClick={() => {
				props.setShowPassword(!props.showPassword);
			}}>
			{props.showPassword ? (
				<VisibilityOffSVG className='fill-slate-600 dark:fill-slate-400' />
			) : (
				<VisibilityOnSVG className='fill-slate-600 dark:fill-slate-400' />
			)}
		</div>
	);
};

export default PasswordVisibilityToggle;
