/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';

export class GithubService {

    
    constructor() {
    }

    _callAPI(url:string, method:string, data:any) {
        return window.fetch(url, {
            method: method,
            headers: {},
            body: JSON.stringify(data)
        })
    }

    getAuthorizeURL() {
        return 'https://github.com/login/oauth/authorize?client_id=dd3e0054b2eab3c42a53&redirect_uri=source://oauth-callback/github&response_type=code'; 
    }

    getQueryString() {
        var result = {};
        if( 1 < window.location.search.length )
        {
            var query = window.location.search.substring( 1 );
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

    getCode() {
        var query = this.getQueryString();
        return query['code'];
    }

    getAccessToken(code:string) {
        var data = {
            'code': code,
            'client_id': 'dd3e0054b2eab3c42a53',
            'client_secret': 'xxx',
            'grant_type': 'authorization_code',     
            'redirect_uri': 'source://oauth-callback/github',
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
