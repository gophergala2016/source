/// <reference path="../_app.ts" />

namespace source.component {

	declare var SOURCE: any;

	'use strict';

	angular.module('source.component', [
		'source.hideblock',
		'source.libraries.cookie',
		'source.libraries.cache',
		'source.libraries.http',
		'source.source_libraries.services',
		'source.personalview',
	])
		.service('APIService', ['HttpService', '$q', 'SourceCookie', source.api.APIService])
		.service('APICallService', ['HttpService', '$q', 'SourceCookie', '$state', 'SourceCache', source.api.APICallService])

		.directive('customSelect', ['$timeout', source.component.directive.customSelect])
		.directive('perfectScrollbar', [source.component.directive.perfectScrollbar])
		.directive('slideToggle', [source.component.directive.slideToggle])
		.directive('convertToNumber', [source.component.directive.convertToNumber])

}
