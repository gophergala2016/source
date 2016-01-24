/// <reference path="../../typings/tsd.d.ts" />

// Angular 2

import {bootstrap, Component, View, coreDirectives, NgFor, NgIf} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

import {GithubService} from '../services/GithubService';
import {CreateBook} from './create/create-book';
import {EditBook} from './edit/edit-book';
import {ListItems} from './list/list-items';
import {ViewBook} from './view/view-book';

import {TagList} from './tag_list';

@Component({
    selector: 'source-app',
    appInjector: [GithubService]
})

@View({
    directives: [ RouterOutlet, RouterLink, coreDirectives, TagList],
    template: `
        <header>
            <div id="head_left">
                <div id="head_logo"><img src="/public/img/source_logo.svg" width="80px" height="20px"></div>
                <ul>
                    <li class="" router-link="list">Home</li>
                    <li class="head_menu_active" router-link="recommend">Recommended</li>
                </ul>
            </div>
            <div id="head_right">
                <div (click)="openCreateItem()" id="button_add">
                    <img src="/public/img/plus.svg" width="12px" height="12px">Add Item
                </div>
                <div (click)="openGithubLogin()" id="button_login">
                    <img src="/public/img/github.svg" width="15px" height="15px">
                    Login to Github
                </div>
            </div>
        </header>
        <div id="main_content">

            <div id="left_navigation">
                <ul>
                    <li class="left_navigation_active">Poplur</li>
                    <li>Your posted</li>
                    <li>Your stars</li>
                </ul>

                <tag-lists></tag-lists>
            </div>
            <div id="right_content">
                <router-outlet></router-outlet>
            </div>
        </div>
  `
})

@RouteConfig([
    { path: '/',            redirectTo: '/list' },
    { path: '/#/list',      as: 'list',      component: ListItems },
    { path: '/#/recommend', as: 'recommend', component: CreateBook },
    { path: '/edit/:id',    as: 'edit',      component: EditBook },
    { path: '/view/:id',    as: 'view',      component: ViewBook }
])

export class App {
    constructor(router: Router, browserLocation: BrowserLocation, public githubService: GithubService) {
    }

    public isHome(browserLocation: BrowserLocation){
        return {head_menu_active: browserLocation.path() == '/'}
    }
    public openGithubLogin(){
        this.githubService.doLogin();
        //alert("click!!!!");
    }
    public openCreateItem(){
        alert("create item!!!!");
    }

}

