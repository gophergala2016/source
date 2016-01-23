/// <reference path="../../_app.ts" />

namespace Source.SourceLibraries.Services {

	'use strict';

	angular.module('source.source_libraries.services', [
		'source.component',
	])
		.service('EnvironmentService', ['$q', '$state', EnvironmentService])
		.service('ErrorService', ['$state', 'APICallService', ErrorService])
}
