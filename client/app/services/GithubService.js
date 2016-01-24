/// <reference path="../../typings/tsd.d.ts" />
var GithubService = (function () {
    function GithubService() {
    }
    GithubService.prototype._callAPI = function (url, method, data) {
        return window.fetch(url, {
            method: method,
            headers: {},
            body: JSON.stringify(data)
        });
    };
    GithubService.prototype.getAuthorizeURL = function () {
        return 'https://github.com/login/oauth/authorize?client_id=dd3e0054b2eab3c42a53&redirect_uri=source://oauth-callback/github&response_type=code';
    };
    GithubService.prototype.getQueryString = function () {
        var result = {};
        if (1 < window.location.search.length) {
            var query = window.location.search.substring(1);
            var parameters = query.split('&');
            for (var i = 0; i < parameters.length; i++) {
                var element = parameters[i].split('=');
                var paramName = decodeURIComponent(element[0]);
                var paramValue = decodeURIComponent(element[1]);
                result[paramName] = paramValue;
            }
        }
        return result;
    };
    GithubService.prototype.getCode = function () {
        var query = this.getQueryString();
        return query['code'];
    };
    GithubService.prototype.getAccessToken = function (code) {
        var data = {
            'code': code,
            'client_id': 'dd3e0054b2eab3c42a53',
            'client_secret': 'xxx',
            'grant_type': 'authorization_code',
            'redirect_uri': 'source://oauth-callback/github',
        };
        return this._callAPI('https://github.com/login/oauth/access_token', 'POST', data);
    };
    GithubService.prototype.getUser = function (accessToken) {
        var data = {};
        return this._callAPI('https://api.github.com/user?access_token=' + accessToken, 'GET', data);
    };
    return GithubService;
})();
exports.GithubService = GithubService;
exports.githubServiceInjectables = [
    GithubService
];

//# sourceMappingURL=GithubService.js.map
