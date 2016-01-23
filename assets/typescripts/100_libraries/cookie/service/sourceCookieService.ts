/// <reference path="../../../_app.ts" />

namespace source.libraries.cookie.service {

	interface ISourceCookie {

		source_token: any;
		user_id: string;
	}

	export class SourceCookie implements ISourceCookie {

		static $inject = [
			'ipCookie'
		];

		constructor(protected ipCookie: any) {
			console.log('new Instance SourceCookie');
			if (SOURCE.config.SOURCE_TOKEN) {
				this.source_token         = SOURCE.config.SOURCE_TOKEN;
				SOURCE.config.SOURCE_TOKEN = null;
			}
		}


		/*
		 * Cookie Properties
		 */

		private _source_token: any;
		get source_token(): any {
			return this.ipCookie('source_token');
		}

		set source_token(value: any) {
			this.ipCookie('source_token', value);
		}

		private _user_id: string;
		get user_id(): string {
			return this.ipCookie('user_id');
		}

		set user_id(value: string) {
			this.ipCookie('user_id', value);
		}
	}
}
