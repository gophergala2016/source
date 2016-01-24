/// <reference path="../../typings/tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('angular2/di');
var http_1 = require('angular2/http');
var ItemService = (function () {
    function ItemService(http) {
        this.http = http;
        this.baseURL = '/v1';
    }
    ItemService.prototype._callAPI = function (url, method, data) {
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
    ItemService.prototype.getItems = function (limit) {
        return this.http.get(this.baseURL + '/items?limit=' + limit);
    };
    ItemService.prototype.getItem = function (id) {
        return this.http.get(this.baseURL + '/item/' + id);
    };
    ItemService.prototype.createItem = function (githubURL) {
        var data = {
            'github_url': githubURL,
        };
        return this._callAPI(this.baseURL + '/item', 'POST', data);
    };
    ItemService = __decorate([
        __param(0, di_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [Object])
    ], ItemService);
    return ItemService;
})();
exports.ItemService = ItemService;
exports.itemServiceInjectables = [
    ItemService,
    http_1.httpInjectables
];

//# sourceMappingURL=ItemService.js.map
