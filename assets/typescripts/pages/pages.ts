/// <reference path="../../typings/tsd.d.ts" />

// Angular 2

import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, Router} from 'angular2/router';
import {BrowserLocation} from 'angular2/src/router/browser_location';

import {GithubService} from '../services/GithubService';
import {CreateBook} from './create/create-book';
import {EditBook} from './edit/edit-book';
import {ListItems} from './list/list-items';
import {ViewBook} from './view/view-book';

@Component({
    selector: 'source-app',
})

@View({
    directives: [ RouterOutlet, RouterLink, coreDirectives],
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
                <div id="button_add">
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

                <h5>Language</h5>

                <p class="language_tag_active">Go</p>
                <p class="language_tag">Go</p>
                <p class="language_tag">Go</p>
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
    constructor(router: Router, browserLocation: BrowserLocation) {
    }

    public isHome(browserLocation: BrowserLocation){
        return {head_menu_active: browserLocation.path() == '/'}
    }
    public openGithubLogin(){
        alert("click!!!!");
    }

}

