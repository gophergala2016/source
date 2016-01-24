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
var angular2_1 = require('angular2/angular2');
var ItemService_1 = require('../../services/ItemService');
var ItemList_1 = require('./ItemList');
var Item_1 = require('../../models/Item');
var Tag_1 = require('../../models/Tag');
var MainItemLists = (function () {
    function MainItemLists(itemService) {
        this.itemService = itemService;
        console.log("MainItemLists constructor");
        // this.getItems('24');
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
        this.items.push(new Item_1.Item(0, "github.com/goka/goka", "katsuya goto", "Golang", "null null null null null null null null ", '2016-01-25 00:00:00', 0, 0, null, [new Tag_1.Tag("Go", "blue")]));
    }
    MainItemLists.prototype.getItems = function (limit) {
        this.itemService.getItems(limit).then(function (response) {
            console.log('response', response);
        }).then(function (json) {
            console.log('parsed json', json);
            this.items = json;
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    };
    MainItemLists = __decorate([
        angular2_1.Component({
            selector: 'recommended-item-list',
            appInjector: [ItemService_1.ItemService]
        }),
        angular2_1.View({
            directives: [ItemList_1.ItemList, angular2_1.coreDirectives],
            templateUrl: '<list-items ["data"]="items" ["kind"]="main"></list-items>'
        }), 
        __metadata('design:paramtypes', [ItemService_1.ItemService])
    ], MainItemLists);
    return MainItemLists;
})();
exports.MainItemLists = MainItemLists;

//# sourceMappingURL=MainItemList.js.map
