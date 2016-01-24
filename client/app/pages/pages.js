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
// Angular 2
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var browser_location_1 = require('angular2/src/router/browser_location');
var create_book_1 = require('./create/create-book');
var edit_book_1 = require('./edit/edit-book');
var list_books_1 = require('./list/list-books');
var view_book_1 = require('./view/view-book');
var App = (function () {
    function App(router, browserLocation) {
        this.title = 'Angular 2 CRUD Application';
        // we need to manually go to the correct uri until the router is fixed
        var uri = browserLocation.path();
        router.navigate(uri);
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'source-app',
        }),
        angular2_1.View({
            directives: [router_1.RouterOutlet, router_1.RouterLink, angular2_1.coreDirectives],
            template: "\n  <nav class=\"navbar navbar-inverse navbar-static-top\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\">{{ title }}</a>\n        </div>\n        <div class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav\">\n                <li>\n                    <a router-link=\"list\">List</a>\n                </li>\n                <li>\n                    <a router-link=\"create\">Create</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n  </nav>\n\n  <main>\n    <router-outlet></router-outlet>\n  </main>\n  "
        }),
        router_1.RouteConfig([
            { path: '/list', as: 'list', component: list_books_1.ListBooks },
            { path: '/create', as: 'create', component: create_book_1.CreateBook },
            { path: '/edit/:id', as: 'edit', component: edit_book_1.EditBook },
            { path: '/view/:id', as: 'view', component: view_book_1.ViewBook }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, browser_location_1.BrowserLocation])
    ], App);
    return App;
})();
exports.App = App;

//# sourceMappingURL=pages.js.map
