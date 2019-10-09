import axios from 'axios';
const CancelToken = axios.CancelToken;
let cancel;
function guard (res, resolve) {
    const headers = res.headers;
    const actrs = headers['access-control-expose-headers'];
    if(headers && actrs) {
        if(actrs !== '' && actrs === 'REDIRECT,REDIRECTURL') {
            // Message.error('登录过期，请重新登录！');
            let url = headers.redirecturl;
            const returnUrl = url.split('?returnUrl=') || [];
            const pageUrl = encodeURIComponent(location.href);
            if(returnUrl[1]) {
                url = returnUrl[0]+'?returnUrl='+pageUrl;
            }

            setTimeout(() => {
                window.location.replace(url);
            }, 500);
        }
    } else {
        resolve(res.data);
    }
}

export function fetch (method = 'GET', url, params, data, headers) {
    return new Promise((resolve, reject) => {
        const options = {
            url: url,
            method: method,
            data: data,
            params: params,
            // cancel request function
            cancelToken: new CancelToken(c => {
                cancel = c;
            }),
            withCredentials: true,
            headers: headers || { 'Content-Type': 'application/json' }
        };
        axios(options)
            .then(res => {
                guard.apply(this, [res, resolve]);
            })
            .catch(error => {
                reject(error);
            });
    });
}

