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
// Angular 2
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var BookService_1 = require('../../services/BookService');
var ListBooks = (function () {
    function ListBooks(router, bookService) {
        this.router = router;
        this.bookService = bookService;
        this.getBooks();
    }
    ListBooks.prototype.getBooks = function () {
        var _this = this;
        this.bookService.getBooks()
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.books = res; });
    };
    ListBooks.prototype.viewBook = function (book) {
        this.router.parent.navigate('/view/' + book.isbn);
    };
    ListBooks.prototype.editBook = function (book) {
        this.router.parent.navigate('/edit/' + book.isbn);
    };
    ListBooks.prototype.deleteBook = function (book) {
        var _this = this;
        this.bookService.deleteBook(book.isbn)
            .subscribe(function (res) { return _this.getBooks(); });
    };
    ListBooks = __decorate([
        angular2_1.Component({
            selector: 'list-books'
        }),
        angular2_1.View({
            directives: [angular2_1.coreDirectives],
            templateUrl: './app/pages/list/list-books.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, BookService_1.BookService])
    ], ListBooks);
    return ListBooks;
})();
exports.ListBooks = ListBooks;

//# sourceMappingURL=list-books.js.map
