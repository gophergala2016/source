/// <reference path="../../typings/tsd.d.ts" />
var Cookie_1 = require('../common/Cookie');
var TagService = (function () {
    function TagService() {
        this.baseURL = '/v1';
    }
    TagService.prototype._callAPI = function (url, method, data) {
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
    TagService.prototype.getTags = function (limit) {
        var data = {};
        return this._callAPI(this.baseURL + '/tags?limit=' + limit, 'GET', data);
    };
    return TagService;
})();
exports.TagService = TagService;
exports.tagServiceInjectables = [
    TagService
];

//# sourceMappingURL=TagService.js.map
