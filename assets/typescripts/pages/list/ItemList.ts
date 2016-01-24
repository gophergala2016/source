/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, Directive, coreDirectives} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {ItemService} from '../../services/ItemService';
import {Item} from '../../models/Item';
import {Pager} from '../../partial/Pager';

@Component({
    selector: 'item-list',
    properties: ['data', 'kind']
})

@View({
    directives: [coreDirectives],
    templateUrl: './public/app/pages/list/list-items.html'
})

export class ItemList {

    constructor(private router:Router) {
        console.log("ItemList constructor")
    }

    public viewItem(item) {
        this.router.parent.navigate('/view/' + item.isbn);
    }
}
