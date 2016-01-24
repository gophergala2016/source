
/// <reference path="../../../typings/tsd.d.ts" />

// Angular 2
import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {ItemService} from '../../services/ItemService';
import {Item} from '../../models/Item';

@Component({
    selector: 'list-items',
    appInjector: [ItemService]
})

@View({
    directives: [coreDirectives],
    templateUrl: './public/app/pages/list/list-items.html'
})

export class ListItems {
    items: Array<Item>;

    constructor(public router:Router, public itemService:ItemService) {
        this.getItems('10');
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

    viewItem(item) {
        this.router.parent.navigate('/view/' + item.isbn);
    }

    editItem(item) {
        this.router.parent.navigate('/edit/' + item.isbn);
    }

    deleteItem(item) {
        // this.itemService.deleteItem(item.isbn)
        //     .subscribe(res => this.getItems('10'));
    }
}
