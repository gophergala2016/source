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
var forms_1 = require('angular2/forms');
var router_1 = require('angular2/router');
var di_1 = require('angular2/di');
var BookService_1 = require('../../services/BookService');
var Book_1 = require('../../models/Book');
// Simple component
var EditBook = (function () {
    function EditBook(params, bookService, formBuilder) {
        this.bookService = bookService;
        this.formBuilder = formBuilder;
        this.book = new Book_1.Book();
        this.canShowUpdateFailedMsg = false;
        this.canShowUpdateSuccessMsg = false;
        this.updateFailedMsg = null;
        this.getBook(params.get('id'));
        this.editBookForm = formBuilder.group({
            'title': ['', forms_1.Validators.required],
            'author': [''],
            'publicationDate': ['']
        });
        this.titleInput = this.editBookForm.controls.title;
        this.authorInput = this.editBookForm.controls.author;
        this.publicationDateInput = this.editBookForm.controls.publicationDate;
    }
    EditBook.prototype.getBook = function (id) {
        var _this = this;
        this.bookService.getBook(id)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.book = Book_1.Book.fromJSON(res); });
    };
    EditBook.prototype.updateBook_successHandler = function (response) {
        var _this = this;
        if (response.status !== 200) {
            this.canShowUpdateFailedMsg = true;
            this.updateFailedMsg = 'Update has failed';
        }
        response.json().then(function (data) {
            _this.canShowUpdateSuccessMsg = true;
            _this.book = Book_1.Book.fromJSON(data);
        });
    };
    EditBook.prototype.updateBook_errorHandler = function (error) {
        this.updateFailedMsg = error;
    };
    EditBook.prototype.updateBook = function () {
        var _this = this;
        this.canShowUpdateSuccessMsg = false;
        this.canShowUpdateFailedMsg = false;
        this.bookService.updateBook(this.book.isbn, this.book.toJSON())
            .then(function (response) { return _this.updateBook_successHandler(response); })
            .catch(function (error) { return _this.updateBook_errorHandler(error); });
    };
    EditBook = __decorate([
        angular2_1.Component({
            selector: 'edit-book'
        }),
        angular2_1.View({
            templateUrl: './public/app/pages/edit/edit-book.html',
            directives: [angular2_1.coreDirectives, forms_1.formDirectives]
        }),
        __param(0, di_1.Inject(router_1.RouteParams)), 
        __metadata('design:paramtypes', [Object, BookService_1.BookService, forms_1.FormBuilder])
    ], EditBook);
    return EditBook;
})();
exports.EditBook = EditBook;

//# sourceMappingURL=edit-book.js.map
