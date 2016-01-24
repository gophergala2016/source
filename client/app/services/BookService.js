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
var BookService = (function () {
    function BookService(http, baseRequestOptions) {
        this.http = http;
        this.baseURL = '/api/books';
        this.baseRequestOptions = baseRequestOptions;
    }
    BookService.prototype._callAPI = function (url, method, data) {
        return window.fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };
    BookService.prototype.getBooks = function () {
        return this.http.get(this.baseURL);
    };
    BookService.prototype.getBook = function (id) {
        return this.http.get(this.baseURL + '/' + id);
    };
    BookService.prototype.updateBook = function (id, data) {
        return this._callAPI(this.baseURL + '/' + id, 'PUT', data);
        /*var headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.put(
            this.baseURL + '/' + id,
            JSON.stringify(data),
            this.baseRequestOptions.merge({
                headers: headers
            })
        );*/
    };
    BookService.prototype.createBook = function (data) {
        return this._callAPI(this.baseURL, 'POST', data);
        /*var headers = new Headers();
         headers.set('Content-Type', 'application/json');
         return this.http.post(
            this.baseURL + '/' + id,
            JSON.stringify(data),
            this.baseRequestOptions.merge({
                headers: headers
            })
         );*/
    };
    BookService.prototype.deleteBook = function (id) {
        return this.http.delete(this.baseURL + '/' + id);
    };
    BookService = __decorate([
        __param(0, di_1.Inject(http_1.Http)),
        __param(1, di_1.Inject(http_1.BaseRequestOptions)), 
        __metadata('design:paramtypes', [Object, Object])
    ], BookService);
    return BookService;
})();
exports.BookService = BookService;
exports.bookServiceInjectables = [
    BookService,
    http_1.httpInjectables
];

//# sourceMappingURL=BookService.js.map
