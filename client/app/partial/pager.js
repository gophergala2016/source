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
var Pager = (function () {
    function Pager() {
        console.log("Pager constructor");
    }
    Pager.prototype.getPage = function () { };
    Pager = __decorate([
        angular2_1.Component({
            selector: 'pager',
            properties: ['max-page', 'current-page', 'paging-num']
        }),
        angular2_1.View({
            directives: [],
            templateUrl: './public/app/partial/pager.html'
        }), 
        __metadata('design:paramtypes', [])
    ], Pager);
    return Pager;
})();
exports.Pager = Pager;

//# sourceMappingURL=pager.js.map
