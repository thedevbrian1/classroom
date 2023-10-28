import { createCookieSessionStorage } from "@remix-run/node";
// import invariant from "tiny-invariant";

// invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'classroom_session',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET],
        secure: true
    }
});

export async function getSession(request) {
    const cookie = request.headers.get('Cookie');
    return sessionStorage.getSession(cookie);
}