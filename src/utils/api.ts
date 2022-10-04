export const API_ENDPOINT = process.env.API_ENDPOINT as string;
export const CLIENT_ID = process.env.CLIENT_ID as string;
export const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
export const REDIRECT_URI = 'http://127.0.0.1:8080';

export function exchangeToken(reqData: URLSearchParams) {
    return fetch(`${API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: reqData,
    });
}

export function getUserInfo(accessToken: string) {
    return fetch(`${API_ENDPOINT}/users/@me`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}

export function getUserGuilds(accessToken: string) {
    return fetch(`${API_ENDPOINT}/users/@me/guilds`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}