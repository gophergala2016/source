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
var TagService_1 = require('../services/TagService');
var Tag_1 = require('../models/Tag');
var TagList = (function () {
    function TagList(tagService) {
        this.tagService = tagService;
        console.log("tag_list");
        this.tags = [];
        // TODO: get response 
        this.tags.push(new Tag_1.Tag("Go", "blue"));
        this.tags.push(new Tag_1.Tag("Java", "red"));
        this.tags.push(new Tag_1.Tag("C++", "yellow"));
        this.tags.push(new Tag_1.Tag("Go", "blue"));
        this.tags.push(new Tag_1.Tag("Java", "red"));
        this.tags.push(new Tag_1.Tag("C++", "yellow"));
        this.tags.push(new Tag_1.Tag("Go", "blue"));
        this.tags.push(new Tag_1.Tag("Java", "red"));
        this.tags.push(new Tag_1.Tag("C++", "yellow"));
        this.getTags();
    }
    TagList.prototype.getColorCode = function () { };
    TagList.prototype.getTags = function () {
        this.tagService.getTags('30').then(function (response) {
            console.log('response', response);
            return JSON.stringify(response);
        }).then(function (json) {
            console.log('parsed json', json);
            // this.tags = json;
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    };
    TagList = __decorate([
        angular2_1.Component({
            selector: 'tag-lists',
            appInjector: [TagService_1.TagService]
        }),
        angular2_1.View({
            directives: [router_1.RouterLink, angular2_1.NgFor, TagList],
            template: "\n        <h5>Language</h5>\n        <p *ng-for=\"#tag of tags\" class=\"language_tag\">\n            {{tag.name}}\n        </p>\n  "
        }), 
        __metadata('design:paramtypes', [TagService_1.TagService])
    ], TagList);
    return TagList;
})();
exports.TagList = TagList;

//# sourceMappingURL=tag_list.js.map
