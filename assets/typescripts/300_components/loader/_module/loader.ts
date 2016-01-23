/// <reference path="../../../_app.ts" />

namespace source.loader {

	'use strict';

	angular.module('source.loader', [
        'source.hideblock',
        'source.libraries.ui',
        'source.personalview',
	])
	.controller(controller)

	.directive('loaderView', ['$rootScope', source.loader.directive.loaderView]);

}
