const p = new URLSearchParams(window.location.search);
const CODE = p.get('code');
console.log(`code: ${CODE}`);

const API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = '1025232858299772999';
const CLIENT_SECRET = 'viqjqq5DWAJuCveSGzXoa6sOkaeE05_h';
const REDIRECT_URI = 'http://127.0.0.1:8080/auth/';

const data = new URLSearchParams();
data.append('client_id', CLIENT_ID);
data.append('client_secret', CLIENT_SECRET);
data.append('grant_type', 'authorization_code');
data.append('code', CODE as string);
data.append('redirect_uri', REDIRECT_URI);

fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    },
    body: data,
}).then(res => res.json())
.then(data => {
    console.log(data);
    fetch(`${API_ENDPOINT}/users/@me`, {
        headers: {
            authorization: `${data.token_type} ${data.access_token}`,
        }
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
})
.catch(e => console.log(e));