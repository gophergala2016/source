/// <reference path="../../_app.ts" />

namespace Source.SourceLibraries.Services {

	'use strict';

	export class ErrorService {

		error: Source.Libraries.Models.Error;

		static $inject = [
			'$state',
			'APICallService',
		];

		constructor(private $state: any,
					private api: source.api.APICallService) {
		}

		set(error: Source.Libraries.Models.Error): void {
			this.error = error;
		}

		getAndReset(): Source.Libraries.Models.Error {
			if (!this.error) {
				var error = new Source.Libraries.Models.Error('', '');
			} else {
				var error = new Source.Libraries.Models.Error(this.error.message, this.error.title);
			}

			this.reset(); // service

			return error;
		}

		private reset(): void {
			this.error = null;
		}

	}

}
