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
var edit_book_1 = require('./edit/edit-book');
var MainItemList_1 = require('./list/MainItemList');
var RecommendedItemList_1 = require('./list/RecommendedItemList');
var view_book_1 = require('./view/view-book');
var TagList_1 = require('../partial/TagList');
var App = (function () {
    function App(router, browserLocation) {
    }
    App.prototype.isHome = function (browserLocation) {
        return { head_menu_active: browserLocation.path() == '/' };
    };
    App.prototype.openGithubLogin = function () {
        alert("click!!!!");
    };
    App.prototype.openCreateItem = function () {
        alert("create item!!!!");
    };
    App = __decorate([
        angular2_1.Component({
            selector: 'source-app',
        }),
        angular2_1.View({
            directives: [router_1.RouterOutlet, router_1.RouterLink, angular2_1.coreDirectives, TagList_1.TagList],
            template: "\n        <header>\n            <div id=\"head_left\">\n                <div id=\"head_logo\"><img src=\"/public/img/source_logo.svg\" width=\"80px\" height=\"20px\"></div>\n                <ul>\n                    <li class=\"\" router-link=\"main_list\">Home</li>\n                    <li class=\"head_menu_active\" router-link=\"recommended_list\">Recommended</li>\n                </ul>\n            </div>\n            <div id=\"head_right\">\n                <div (click)=\"openCreateItem()\" id=\"button_add\">\n                    <img src=\"/public/img/plus.svg\" width=\"12px\" height=\"12px\">Add Item\n                </div>\n                <div (click)=\"openGithubLogin()\" id=\"button_login\">\n                    <img src=\"/public/img/github.svg\" width=\"15px\" height=\"15px\">\n                    Login to Github\n                </div>\n            </div>\n        </header>\n        <div id=\"main_content\">\n\n            <div id=\"left_navigation\">\n                <ul>\n                    <li class=\"left_navigation_active\">Poplur</li>\n                    <li>Your posted</li>\n                    <li>Your stars</li>\n                </ul>\n\n                <tag-lists></tag-lists>\n            </div>\n            <div id=\"right_content\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n  "
        }),
        router_1.RouteConfig([
            { path: '/', redirectTo: '/MainItemLists' },
            { path: '/#/main_list', as: 'main_list', component: MainItemList_1.MainItemLists },
            { path: '/#/RecommendedItemLists', as: 'recommended_list', component: RecommendedItemList_1.RecommendedItemLists },
            { path: '/edit/:id', as: 'edit', component: edit_book_1.EditBook },
            { path: '/view/:id', as: 'view', component: view_book_1.ViewBook }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, browser_location_1.BrowserLocation])
    ], App);
    return App;
})();
exports.App = App;

//# sourceMappingURL=pages.js.map
