/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';

export class ItemService {

    baseURL: string;
    
    constructor() {
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

    getItem(id:string) {
        var data = {};
        return this._callAPI(this.baseURL + '/item/' + id, 'GET', data);
    }

    getItems(limit:string) {
        var data = {};
        this._callAPI(this.baseURL + '/items?limit=' + limit, 'GET', data)
          .then(function(response) {
            console.log('response', response)
          }).then(function(json) {
            console.log('parsed json', json)
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
    }

    createItem(githubURL:string) {
        var data = {
            'github_url': githubURL,
        };
        return this._callAPI(this.baseURL + '/item', 'POST', data);
    }

    createFavorite(id:string) {
        var data = {};
        return this._callAPI(this.baseURL + 'favorite/' + id, 'POST', data);
    }

    getFavorites(limit:string) {
        var data = {};
        return this._callAPI(this.baseURL + '/favorites?limit=' + limit, 'GET', data);
    }
}

export let itemServiceInjectables = [
    ItemService
];
