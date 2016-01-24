/// <reference path="../../typings/tsd.d.ts" />
var GithubService = (function () {
    function GithubService() {
        this.windowHandle = null;
        this.intervalId = null;
        this.loopCount = 600;
        this.intervalLength = 100;
    }
    GithubService.prototype.createWindow = function (url, name, width, height, left, top) {
        if (name === void 0) { name = 'Window'; }
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 600; }
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (url == null) {
            return null;
        }
        var options = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
        return window.open(url, name, options);
    };
    GithubService.prototype.getAuthorizeURL = function () {
        return 'https://github.com/login/oauth/authorize?client_id=dd3e0054b2eab3c42a53&redirect_uri=http://getsource.io/auth/callback&response_type=code';
    };
    GithubService.prototype.doLogin = function () {
        var _this = this;
        var loopCount = this.loopCount;
        this.windowHandle = window.open(this.getAuthorizeURL());
        this.intervalId = setInterval(function () {
            if (loopCount-- < 0) {
                clearInterval(_this.intervalId);
                _this.windowHandle.close();
            }
            else {
                var href;
                try {
                    href = _this.windowHandle.location.href;
                }
                catch (e) {
                    console.log('Error:', e);
                }
            }
        }, this.intervalLength);
    };
    GithubService.prototype.getQueryString = function () {
        var result = {};
        if (1 < this.windowHandle.location.search.length) {
            var query = this.windowHandle.location.search.substring(1);
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
    GithubService.prototype._callAPI = function (url, method, data) {
        return window.fetch(url, {
            method: method,
            headers: {},
            body: JSON.stringify(data)
        });
    };
    GithubService.prototype.getAccessToken = function (code) {
        var data = {
            'code': code,
            'client_id': 'dd3e0054b2eab3c42a53',
            'client_secret': 'xxx',
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://getsource.io/auth/callback',
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
