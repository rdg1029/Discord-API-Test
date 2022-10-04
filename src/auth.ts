const p = new URLSearchParams(window.location.search);
const CODE = p.get('code');
console.log(`code: ${CODE}`);

const API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = '1025232858299772999';
const CLIENT_SECRET = 'viqjqq5DWAJuCveSGzXoa6sOkaeE05_h';
const REDIRECT_URI = 'http://127.0.0.1:8080/auth/';

function exchangeToken(reqData: URLSearchParams) {
    return fetch(`${API_ENDPOINT}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: reqData,
    });
}

function getUserInfo(accessToken: string) {
    return fetch(`${API_ENDPOINT}/users/@me`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}

function getUserGuilds(accessToken: string) {
    return fetch(`${API_ENDPOINT}/users/@me/guilds`, {
        headers: {
            authorization: `Bearer ${accessToken}`,
        }
    });
}

if (sessionStorage.getItem('refresh_token')) {
    const data = new URLSearchParams();
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', CLIENT_SECRET);
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', sessionStorage.getItem('refresh_token') as string);

    exchangeToken(data).then(res => res.json())
    .then(data => {
        console.log(data);
        sessionStorage.setItem('refresh_token', data.refresh_token);

        getUserInfo(data.access_token).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));

        getUserGuilds(data.access_token).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
}
else {
    const data = new URLSearchParams();
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('code', CODE as string);
    data.append('redirect_uri', REDIRECT_URI);

    exchangeToken(data).then(res => res.json())
    .then(data => {
        console.log(data);
        sessionStorage.setItem('refresh_token', data.refresh_token);

        getUserInfo(data.access_token).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));

        getUserGuilds(data.access_token).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
}