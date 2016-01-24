var Book = (function () {
    function Book(isbn, title, author, publicationDate) {
        if (isbn === void 0) { isbn = null; }
        if (title === void 0) { title = null; }
        if (author === void 0) { author = null; }
        if (publicationDate === void 0) { publicationDate = null; }
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationDate = publicationDate;
    }
    Book.fromJSON = function (json) {
        if (json) {
            var isbn = json.isbn || null;
            var title = json.title || null;
            var author = json.author || null;
            var publicationDate = json.publicationDate || null;
            return new Book(isbn, title, author, publicationDate);
        }
        else {
            return new Book(null, null, null, null);
        }
    };
    Book.prototype.toJSON = function () {
        var json = {
            isbn: this.isbn,
            title: this.title,
            author: this.author,
            publicationDate: this.publicationDate
        };
        return json;
    };
    return Book;
})();
exports.Book = Book;

//# sourceMappingURL=Book.js.map
