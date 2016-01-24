/// <reference path="../../typings/tsd.d.ts" />

// Angular 2

import {Component, View, NgFor} from 'angular2/angular2';
import {RouterLink, Router} from 'angular2/router';
import {TagService} from '../services/TagService';
import {Tag} from '../models/Tag';

@Component({
    selector: 'tag-lists',
    appInjector: [TagService]
})

@View({
    directives: [ RouterLink, NgFor, TagList],
    template: `
        <h5>Language</h5>
        <p *ng-for="#tag of tags" class="language_tag">
            {{tag.name}}
        </p>
  `
})

export class TagList {
    tags: Tag[];
    constructor(private tagService: TagService) {
        console.log("tag_list");

        this.tags = [];
        // TODO: get response 
        this.tags.push(new Tag("Go", "blue"));
        this.tags.push(new Tag("Java", "red"));
        this.tags.push(new Tag("C++", "yellow"));
        this.tags.push(new Tag("Go", "blue"));
        this.tags.push(new Tag("Java", "red"));
        this.tags.push(new Tag("C++", "yellow"));
        this.tags.push(new Tag("Go", "blue"));
        this.tags.push(new Tag("Java", "red"));
        this.tags.push(new Tag("C++", "yellow"));

        this.getTags();
    }

    public getColorCode(){}

    public getTags(){
        this.tagService.getTags('30').then(function(response) {
            console.log('response', response)
            return JSON.stringify(response);

          }).then(function(json) {
            console.log('parsed json', json)
            // this.tags = json;

          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
    }

}

