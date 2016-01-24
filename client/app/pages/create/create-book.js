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
var forms_1 = require('angular2/forms');
var router_1 = require('angular2/router');
var BookService_1 = require('../../services/BookService');
var Book_1 = require('../../models/Book');
// Simple component
var CreateBook = (function () {
    function CreateBook(router, bookService, formBuilder) {
        this.router = router;
        this.bookService = bookService;
        this.formBuilder = formBuilder;
        this.book = new Book_1.Book();
        this.createFailedMsg = null;
        this.canShowCreateFailedMsg = false;
        this.createBookForm = formBuilder.group({
            'isbn': ['', forms_1.Validators.required],
            'title': ['', forms_1.Validators.required],
            'author': [''],
            'publicationDate': ['']
        });
        this.isbnInput = this.createBookForm.controls.isbn;
        this.titleInput = this.createBookForm.controls.title;
        this.authorInput = this.createBookForm.controls.author;
        this.publicationDateInput = this.createBookForm.controls.publicationDate;
    }
    CreateBook.prototype.createBook_successHandler = function (response) {
        var _this = this;
        if (response.status !== 201) {
            response.json().then(function (data) {
                _this.canShowCreateFailedMsg = true;
                _this.createFailedMsg = data.errorMessage || 'An error has occurred';
            });
        }
        else {
            this.listBooks();
        }
    };
    CreateBook.prototype.createBook_errorHandler = function (error) {
        this.createFailedMsg = error;
    };
    CreateBook.prototype.createBook = function () {
        var _this = this;
        this.canShowCreateFailedMsg = false;
        this.bookService.createBook(this.book.toJSON())
            .then(function (response) { return _this.createBook_successHandler(response); })
            .catch(function (error) { return _this.createBook_errorHandler(error); });
    };
    CreateBook.prototype.listBooks = function () {
        this.router.parent.navigate('/list');
    };
    CreateBook = __decorate([
        angular2_1.Component({
            selector: 'create-book'
        }),
        angular2_1.View({
            templateUrl: './public/app/pages/create/create-book.html',
            directives: [angular2_1.coreDirectives, forms_1.formDirectives]
        }), 
        __metadata('design:paramtypes', [router_1.Router, BookService_1.BookService, forms_1.FormBuilder])
    ], CreateBook);
    return CreateBook;
})();
exports.CreateBook = CreateBook;

//# sourceMappingURL=create-book.js.map
