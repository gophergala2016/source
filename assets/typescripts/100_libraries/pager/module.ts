/// <reference path="../../_app.ts" />
namespace source.libraries.pager {

	'use strict';

	angular.module('source.libraries.pager', [
		'source.libraries.ui'
	])
		.service('PagerService', ['$state', '$timeout', 'UiService', source.libraries.pager.PagerService])
}
