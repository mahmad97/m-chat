import type { MiddlewareConfig } from 'next/server';

import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
	console.log(request.nextUrl.pathname);

	return NextResponse.next();
};

export const config: MiddlewareConfig = {
	matcher: '/about',
};
