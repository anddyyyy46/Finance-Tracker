import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchBackend, LoginResponse } from './util';

const accessablePaths = ["/", "/login", "signup"];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl

    if (!token && !accessablePaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    const res = await fetchBackend("/auth/validate", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        } as HeadersInit
    })
    const statusNum = res.status;
    if (statusNum !== 200) {
        if (statusNum === 401 || statusNum === 403) {
            const refreshToken = request.cookies.get('refreshToken')?.value;
            const resRefresh = await fetchBackend("/auth/refresh", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                } as HeadersInit,
                body: JSON.stringify({
                    "refreshToken": refreshToken
                }),
            })
            const resStatusNum = resRefresh.status;
            if (resStatusNum === 200) {
                const loginResponse: LoginResponse = await resRefresh.json()
                const accessCookie = loginResponse.token;
                const refreshCookie = loginResponse.refreshToken;

                const response = NextResponse.next();

                response.cookies.set("accessToken", accessCookie, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 604800,
                    path: "/",
                  });
                response.cookies.set("refreshToken", refreshCookie, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 604800,
                    path: "/",
                  })

                return response;
            }
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup|$).*)'],
}