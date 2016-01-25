/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {Item} from '../../models/Item';
import {Pager} from '../../partial/Pager';

@Component({
    selector: 'item-list',
    properties: ['data', 'kind']
})

@View({
    directives: [coreDirectives],
    templateUrl: './public/app/pages/list/item-list.html'
})

export class ItemList {

    constructor(private router:Router) {
        console.log("ItemList constructor")
    }

    public viewItem(item: Item) {
        this.router.parent.navigate('/view/' + item.name);
    }
}
