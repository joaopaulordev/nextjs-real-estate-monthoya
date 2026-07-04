'use server';

import { cookies } from 'next/headers';

export async function setTokenCookie(tokenValue: string) {
    const cookieStore = await cookies()
    cookieStore.set('token', tokenValue, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })
}

export async function getTokenCookie() {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}   