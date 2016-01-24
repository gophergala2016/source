/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';

export class GithubService {

    private windowHandle:any = null;
    private intervalId:any = null;
    private loopCount = 600;
    private intervalLength = 100;
    
    constructor() {
    }

    createWindow(url:string, name:string='Window', width:number=500, height:number=600, left:number=0, top:number=0) {
        if (url == null) {
            return null;
        }
        var options = `width=${width},height=${height},left=${left},top=${top}`;
        return window.open(url, name, options);
    }

    getAuthorizeURL() {
        return 'https://github.com/login/oauth/authorize?client_id=dd3e0054b2eab3c42a53&redirect_uri=http://getsource.io/auth/callback&response_type=code'; 
    }

    public doLogin() {
        var loopCount = this.loopCount;
        this.windowHandle = window.open(this.getAuthorizeURL());

        this.intervalId = setInterval(() => {
        if (loopCount-- < 0) { // if we get below 0, it's a timeout and we close the window
            clearInterval(this.intervalId);
            this.windowHandle.close();
        } else { // otherwise we check the URL of the window
            var href:string;
            try {
                href = this.windowHandle.location.href;
            } catch (e) {
                console.log('Error:', e);
            }

        }
    }, this.intervalLength);
    }


    getQueryString() {
        var result = {};
        if( 1 < this.windowHandle.location.search.length )
        {
            var query = this.windowHandle.location.search.substring( 1 );
            var parameters = query.split( '&' );

            for( var i = 0; i < parameters.length; i++ )
            {
                var element = parameters[ i ].split( '=' );

                var paramName = decodeURIComponent( element[ 0 ] );
                var paramValue = decodeURIComponent( element[ 1 ] );

                result[ paramName ] = paramValue;
            }
        }
        return result;
    }

    _callAPI(url:string, method:string, data:any) {
        return window.fetch(url, {
            method: method,
            headers: {},
            body: JSON.stringify(data)
        })
    }   

    public getAccessToken(code:string) {
        var data = {
            'code': code,
            'client_id': 'dd3e0054b2eab3c42a53',
            'client_secret': 'xxx',
            'grant_type': 'authorization_code',     
            'redirect_uri': 'http://getsource.io/auth/callback',
        };
        return this._callAPI('https://github.com/login/oauth/access_token', 'POST', data);
    }

    getUser(accessToken:string) {
        var data = {};
        return this._callAPI('https://api.github.com/user?access_token=' + accessToken, 'GET', data);
    }
}

export let githubServiceInjectables = [
    GithubService
];
