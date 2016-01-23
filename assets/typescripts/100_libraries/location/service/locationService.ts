/// <reference path="../../../_app.ts" />
namespace source.libraries.location.service {
	var tokenName = 'source_token';

	export interface ILocationService {
		path(string);
	}

	export class LocationService {
		static $inject = [
			'$location',
			'SourceCookie',
		];
		constructor(
			private $location: ng.ILocationService,
			private SourceCookie: any
		) {}

		// source_token URL
		path(url:string): any {
			var params = {};
			params[tokenName] = this.SourceCookie.getCookie(tokenName);
			return this.$location.path(url).search(params);
		}
	}
}
