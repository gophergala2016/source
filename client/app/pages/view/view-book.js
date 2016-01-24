/// <reference path="../../../typings/tsd.d.ts" />
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
// Angular 2
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var di_1 = require('angular2/di');
var BookService_1 = require('../../services/BookService');
var Book_1 = require('../../models/Book');
var ViewBook = (function () {
    function ViewBook(params, bookService) {
        this.bookService = bookService;
        this.book = new Book_1.Book();
        this.getBook(params.get('id'));
    }
    ViewBook.prototype.getBook = function (id) {
        var _this = this;
        this.bookService.getBook(id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.book = Book_1.Book.fromJSON(res); });
    };
    ViewBook = __decorate([
        angular2_1.Component({
            selector: 'view-book'
        }),
        angular2_1.View({
            templateUrl: './app/pages/view/view-book.html'
        }),
        __param(0, di_1.Inject(router_1.RouteParams)), 
        __metadata('design:paramtypes', [Object, BookService_1.BookService])
    ], ViewBook);
    return ViewBook;
})();
exports.ViewBook = ViewBook;

//# sourceMappingURL=view-book.js.map
