/// <reference path="../../_app.ts" />

namespace source.api {

	'use strict';

	declare var SOURCE: any;

	export class APIService {

		static $inject = [
			'HttpService',
			'$q',
			'SourceCookie',
		];

		constructor(protected httpService: any,
					protected $q: ng.IQService,
					protected sourceCookie: source.libraries.cookie.service.SourceCookie) {
			console.log('new Instance APIService');
			// Nothing.
		}

		getVersion(): string {
			return SOURCE.config.VERSION;
		}

		protected buildParams(addParams: any): any {
			var params: source.api.IValidTokenRequestData = {
				device : SOURCE.config.DEVICE,
				version: this.getVersion(),
			};
			return $.extend(params, addParams);
		}

		protected apiCallPost(path: string, addParams: any): ng.IPromise<any> {
			return this.apiCall(path, addParams, (path: string, addParams: any): ng.IPromise<any> => {
				return this.httpService.postJSON(path, addParams);
			});
		}

		protected apiCallGet(path: string, addParams: any): ng.IPromise<any> {
			var params = this.buildParams(addParams);
			return this.apiCall(path, params, (path: string, addParams: any): ng.IPromise<any> => {
				return this.httpService.getParams(path, addParams);
			});
		}

		protected apiCallPut(path: string, addParams: any) {
			return this.apiCall(path, addParams, (path: string, addParams: any): ng.IPromise<any> => {
				return this.httpService.putJSON(path, addParams);
			});
		}

		protected apiCallDelete(path: string, addParams: any) {
			return this.apiCall(path, addParams, (path: string, addParams: any): ng.IPromise<any> => {
				return this.httpService.delete(path, addParams);
			});
		}

		protected apiCall(path: string, addParams: any, method: any): ng.IPromise<any> {

			var params = this.buildParams(addParams);

			var dfd = this.$q.defer<any>();

			method(path, params)
				.success(function (response) {
					return dfd.resolve(response);
				})
				.error(function (response) {
					return dfd.reject(response);
				});

			return dfd.promise;
		}

		protected getSyncAjax(path: string, addParams: any): any {
			return this.syncAjax('GET', path, addParams);
		}

		protected postSyncAjax(path: string, addParams: any): any {
			return this.syncJsonAjax('POST', path, addParams);
		}

		protected putSyncAjax(path: string, addParams: any): any {
			return this.syncJsonAjax('PUT', path, addParams);
		}

		protected deleteSyncAjax(path: string, addParams: any): any {
			return this.syncAjax('DELETE', path, addParams);
		}

		protected formalApiPath(path: string): string {
			return '/1.0/' + path;
		}

		protected syncJsonAjax(method: string, path: string, addParams: any): any {
			var params        = this.buildParams(addParams);
			var response:any = $.ajax({
				url        : this.formalApiPath(path),
				type     : method,
				headers    : {
					'Source-Token': this.sourceCookie.source_token
				},
				data       : JSON.stringify(params),
				contentType: 'application/json',
				async      : false
			}).responseText;

			return JSON.parse(response);
		}

		protected syncAjax(method: string, path: string, addParams: any): any {
			var params        = this.buildParams(addParams);
			var response: any = $.ajax({
				url    : this.formalApiPath(path) + '?' + $.param(params),
				type : method,
				headers: {
					'Source-Token': this.sourceCookie.source_token
				},
				async  : false
			});

			if (0 < response.responseText.length) {
				return JSON.parse(response.responseText);
			}

			return null;
		}

	}

}
