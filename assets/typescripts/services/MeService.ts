/// <reference path="../../typings/tsd.d.ts" />

import {Inject} from 'angular2/di';

export class MeService {

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

    getMe() {
        var data = {};
        return this._callAPI(this.baseURL + '/me', 'GET', data);
    }

    loginMe(name:string, avatarURL:string, location:string) {
        var data = {
            'name': name,
            'avatar_url': avatarURL,
            'location': location,
        };
        return this._callAPI(this.baseURL + '/me', 'POST', data);
    }

}

export let meServiceInjectables = [
    MeService
];
