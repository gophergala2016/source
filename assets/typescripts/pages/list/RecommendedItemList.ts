/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';

import {ItemService} from '../../services/ItemService';
import {ItemList} from './ItemList';
import {Item} from '../../models/Item';
import {Tag} from '../../models/Tag';

@Component({
    selector: 'recommended-item-list',
    appInjector: [ItemService]
})

@View({
    directives: [ItemList, coreDirectives],
    templateUrl: '<list-items ["data"]="items" ["kind"]="recommended"></list-items>'
})

export class RecommendedItemLists {
    items: Array<Item>;

    constructor(public itemService:ItemService) {
        console.log("RecommendedItemLists constructor")
        // this.getItems('10');
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));
        this.items.push(new Item(0,"github.com/goka/goka","katsuya goto", "Golang","null null null null null null null null ", '2016-01-25 00:00:00',0,0,null, [new Tag("Go", "blue")]));

    }

    getItems(limit:string) {
        this.itemService.getItems(limit).then(function(response) {
            console.log('response', response)
          }).then(function(json) {
            console.log('parsed json', json)
            this.items = json;
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
    }
}
