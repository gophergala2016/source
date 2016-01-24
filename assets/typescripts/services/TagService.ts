/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';
import { Cookie } from '../common/Cookie';

export class TagService {

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
                'Authorization': 'Bearer ' + Cookie.getCookie('accessToken')
            },
            body: JSON.stringify(data)
        })
    }

    public getTags(limit:string) {
        var data = {};
        return this._callAPI(this.baseURL + '/tags?limit=' + limit, 'GET', data);
    }
}

export let tagServiceInjectables = [
    TagService
];
