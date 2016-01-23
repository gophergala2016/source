/// <reference path="../../_app.ts" />

namespace source.api {

	'use strict';

	export class APICallService extends APIService {

		defaultAPIVersion:string;

		static $inject = [
			'HttpService',
			'$q',
			'SourceCookie',
			'$state',
		];

		constructor(protected httpService:ng.IHttpService,
					protected $q:ng.IQService,
					protected sourceCookie:source.libraries.cookie.service.SourceCookie,
					protected $state:any) {
			super(httpService, $q, sourceCookie);
			this.defaultAPIVersion = '1.0';
		}

		public getServiceAuth():ng.IPromise<any> {
			return null;
		}

		protected versioningPath(path:string):string {
			return '/' + this.defaultAPIVersion + '/' + path;
		}

		public getMe():ng.IPromise<any> {
			return this.apiCallGet(this.versioningPath('me'), {});
		}
	}
}

