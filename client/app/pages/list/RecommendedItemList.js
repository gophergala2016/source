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
var RecommendedItemList = (function () {
    function RecommendedItemList(itemService) {
        this.itemService = itemService;
        this.kind = 'recommended';
        console.log("RecommendedItemLists constructor");
        this.getItems('24');
    }
    RecommendedItemList.prototype.getItems = function (limit) {
        this.itemService.getItems(limit).then(function (response) {
            console.log('response', response);
        }).then(function (json) {
            console.log('parsed json', json);
            this.items = json;
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    };
    RecommendedItemList = __decorate([
        angular2_1.Component({
            selector: 'recommended-item-list',
            appInjector: [ItemService_1.ItemService]
        }),
        angular2_1.View({
            directives: [ItemList_1.ItemList],
            template: "\n\n    <item-list ['data']=\"items\" ['kind']=\"kind\">\n\n    </item-list>\n"
        }), 
        __metadata('design:paramtypes', [ItemService_1.ItemService])
    ], RecommendedItemList);
    return RecommendedItemList;
})();
exports.RecommendedItemList = RecommendedItemList;

//# sourceMappingURL=RecommendedItemList.js.map
