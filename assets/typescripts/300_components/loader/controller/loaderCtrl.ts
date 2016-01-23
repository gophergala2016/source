/// <reference path="../../../_app.ts" />

namespace source.loader.controller {

	'use strict';

	export class LoaderController {

		static $inject = [
			'$http',
			'$timeout',
			'$interval',
			'UiService',
		];

		http: any;
		timeout: any;
		interval: any;
		uiService: source.libraries.ui.UiService;

		constructor(
			private $http: any,
			private $timeout: any,
			private $interval: any,
			protected UiService: source.libraries.ui.UiService
		) {
			this.http = $http;
			this.timeout = $timeout;
			this.interval = $interval;
			this.uiService = UiService;
		}

	}

}
