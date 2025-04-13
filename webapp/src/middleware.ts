import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log("jkgnfdgnfjdgng")

    if (!token) {
        // Wenn kein Token vorhanden ist, redirect zur Login-Seite
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Optional: Du kannst hier den JWT auch validieren, z.B. mit `jsonwebtoken` (nur mit Edge-kompatiblem Code!)

    return NextResponse.next();
}

export const config = {
    matcher: [
    ],
};