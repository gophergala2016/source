/// <reference path="../../_app.ts" />

namespace Source.SourceLibraries.Controller {

	'use strict';

	export class ApplicationController {

		static $inject = [
			'$rootScope',
		];

		constructor(protected $rootScope: ng.IRootScopeService) {
		}
	}
}

