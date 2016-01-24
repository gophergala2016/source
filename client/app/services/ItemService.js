/// <reference path="../../typings/tsd.d.ts" />
var Cookie_1 = require('../common/Cookie');
var ItemService = (function () {
    function ItemService() {
        this.baseURL = '/v1';
    }
    ItemService.prototype._callAPI = function (url, method, data) {
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
    ItemService.prototype.getItem = function (id) {
        var data = {};
        return this._callAPI(this.baseURL + '/item/' + id, 'GET', data);
    };
    ItemService.prototype.getItems = function (limit) {
        var data = {};
        return this._callAPI(this.baseURL + '/items?limit=' + limit, 'GET', data);
    };
    ItemService.prototype.getItemsByTag = function (tagID, limit) {
        var data = {};
        this._callAPI(this.baseURL + '/items?limit=' + limit + '&tag_id=' + tagID, 'GET', data)
            .then(function (response) {
            console.log('response', response);
        }).then(function (json) {
            console.log('parsed json', json);
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    };
    ItemService.prototype.createItem = function (githubURL) {
        var data = {
            'github_url': githubURL,
        };
        return this._callAPI(this.baseURL + '/item', 'POST', data);
    };
    ItemService.prototype.createFavorite = function (id) {
        var data = {};
        return this._callAPI(this.baseURL + 'favorite/' + id, 'POST', data);
    };
    ItemService.prototype.getFavorites = function (limit) {
        var data = {};
        return this._callAPI(this.baseURL + '/favorites?limit=' + limit, 'GET', data);
    };
    return ItemService;
})();
exports.ItemService = ItemService;
exports.itemServiceInjectables = [
    ItemService
];

//# sourceMappingURL=ItemService.js.map
