import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type CookieAttribute =
	| 'Expires'
	| 'HttpOnly'
	| 'Max-Age'
	| 'Path'
	| 'Secure'
	| 'SameSite';

const cookieAttributeMap = {
	Expires: 'expires',
	HttpOnly: 'httpOnly',
	'Max-Age': 'maxAge',
	Path: 'path',
	Secure: 'secure',
	SameSite: 'sameSite',
};

const cookieExtractor = (cookieString: string) => {
	const [nameValue, ...attributes] = cookieString.split('; ');
	const [name, value] = nameValue.split('=');
	const options: ResponseCookie = { name, value };
	attributes.forEach((option) => {
		const keyVal = option.split('=');
		const key = cookieAttributeMap[keyVal[0] as CookieAttribute];

		switch (key) {
			case 'expires':
				options[key] = Date.parse(keyVal[1]);
				break;
			case 'httpOnly':
				options[key] = true;
				break;
			case 'maxAge':
				options[key] = Number(keyVal[1]);
				break;
			case 'path':
				options[key] = keyVal[1];
				break;
			case 'secure':
				options[key] = true;
				break;
			case 'sameSite':
				options[key] = (keyVal[1].charAt(0).toLowerCase() +
					keyVal[1].slice(1)) as 'strict' | 'lax' | 'none';
				break;
			default:
				break;
		}
	});

	return options;
};

export { cookieExtractor };
