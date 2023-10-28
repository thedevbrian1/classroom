import { json } from "@remix-run/node";

export function validateText(text) {
    if (typeof text !== "string" || text.length < 2) {
        return 'Text is invalid';
    }
}

export function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof email !== "string" || !pattern.test(email)) {
        return 'Email is invalid';
    }
}

export function badRequest(data) {
    return json(data, { status: 404 });
}