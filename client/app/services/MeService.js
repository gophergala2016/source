/// <reference path="../../typings/tsd.d.ts" />
var Cookie_1 = require('../common/Cookie');
var MeService = (function () {
    function MeService() {
        this.baseURL = '/v1';
    }
    MeService.prototype._callAPI = function (url, method, data) {
        return window.fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': 'qaw35dRtgyhtpDdDA21vgbjmyr43474kkdj',
                'Authorization': 'Bearer ' + Cookie_1.Cookie.getCookie('accessToken')
            },
            body: JSON.stringify(data)
        });
    };
    MeService.prototype.getMe = function () {
        var data = {};
        return this._callAPI(this.baseURL + '/me', 'GET', data);
    };
    MeService.prototype.loginMe = function (name, avatarURL, location) {
        var data = {
            'name': name,
            'avatar_url': avatarURL,
            'location': location,
        };
        return this._callAPI(this.baseURL + '/me', 'POST', data);
    };
    return MeService;
})();
exports.MeService = MeService;
exports.meServiceInjectables = [
    MeService
];

//# sourceMappingURL=MeService.js.map
