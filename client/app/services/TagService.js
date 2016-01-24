/// <reference path="../../typings/tsd.d.ts" />
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
                'Authorization': 'Bearer HCDbAav5VUWkUNFunGhRU41JXVT7gfxysZmLCtrx'
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
