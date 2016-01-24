/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';
import {Http, Headers, httpInjectables} from 'angular2/http';

export class ItemService {

    http: Http;
    baseURL: string;
    
    constructor(@Inject(Http) http) {
        this.http = http;
        this.baseURL = '/v1';
    }

    _callAPI(url:string, method:string, data:any) {
        return window.fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': 'qaw35dRtgyhtpDdDA21vgbjmyr43474kkdj',
                'Authorization': 'Bearer HCDbAav5VUWkUNFunGhRU41JXVT7gfxysZmLCtrx'
            },
            body: JSON.stringify(data)
        })
    }

    getItems(limit:string) {
        return this.http.get(this.baseURL + '/items?limit=' + limit);
    }

    getItem(id:string) {
        return this.http.get(this.baseURL + '/item/' + id);
    }
    
    createItem(githubURL:string) {
        var data = {
            'github_url': githubURL,
        }
        return this._callAPI(this.baseURL + '/item', 'POST', data);
    }
}

export let itemServiceInjectables = [
    ItemService,
    httpInjectables
];
