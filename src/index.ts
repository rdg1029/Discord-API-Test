import * as API from './utils/api';

window.onload = () => {
    const query = new URLSearchParams(window.location.search);
    const CODE = query.get('code');
    console.log(CODE);

    const loginLink = document.getElementById('login-with-discord') as HTMLLinkElement;
    const contents = document.getElementById('contents') as HTMLDivElement
    const userName = document.getElementById('user-name') as HTMLParagraphElement;

    function requestApi(data: URLSearchParams) {
        API.exchangeToken(data).then(res => res.json())
        .then(data => {
            console.log(data);
            sessionStorage.setItem('refresh_token', data.refresh_token);
    
            API.getUserInfo(data.access_token).then(res => res.json())
            .then(data => {
                loginLink.style.display = 'none';
                userName.innerText = data.username;
                contents.style.display = "unset";
            })
            .catch(e => console.log(e));
    
            API.getUserGuilds(data.access_token).then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
    
    if (sessionStorage.getItem('refresh_token')) {
        const data = new URLSearchParams();
        data.append('client_id', API.CLIENT_ID);
        data.append('client_secret', API.CLIENT_SECRET);
        data.append('grant_type', 'refresh_token');
        data.append('refresh_token', sessionStorage.getItem('refresh_token') as string);
    
        requestApi(data);
    }
    else {
        if (!CODE) return;
        const data = new URLSearchParams();
        data.append('client_id', API.CLIENT_ID);
        data.append('client_secret', API.CLIENT_SECRET);
        data.append('grant_type', 'authorization_code');
        data.append('code', CODE as string);
        data.append('redirect_uri', API.REDIRECT_URI);
    
        requestApi(data);
    }
}