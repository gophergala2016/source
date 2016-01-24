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
var ItemService_1 = require('../../services/ItemService');
var ListItems = (function () {
    function ListItems(router, itemService) {
        this.router = router;
        this.itemService = itemService;
        this.getItems('10');
    }
    ListItems.prototype.getItems = function (limit) {
        var _this = this;
        this.itemService.getItems(limit)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.items = res; });
    };
    ListItems.prototype.viewItem = function (item) {
        this.router.parent.navigate('/view/' + item.isbn);
    };
    ListItems.prototype.editItem = function (item) {
        this.router.parent.navigate('/edit/' + item.isbn);
    };
    ListItems.prototype.deleteItem = function (item) {
        // this.itemService.deleteItem(item.isbn)
        //     .subscribe(res => this.getItems('10'));
    };
    ListItems = __decorate([
        angular2_1.Component({
            selector: 'list-items'
        }),
        angular2_1.View({
            directives: [angular2_1.coreDirectives],
            templateUrl: './public/app/pages/list/list-items.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, ItemService_1.ItemService])
    ], ListItems);
    return ListItems;
})();
exports.ListItems = ListItems;

//# sourceMappingURL=list-items.js.map
