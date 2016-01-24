/// <reference path="../../typings/tsd.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'pager',
    properties: ['max-page', 'current-page', 'paging-num']
})

@View({
    directives: [],
    templateUrl: './public/app/partial/pager.html'
})

export class Pager {
    constructor() {
        console.log("Pager constructor");
    }
    public getPage(){}
}
