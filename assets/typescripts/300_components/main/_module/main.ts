/// <reference path="../../../_app.ts" />

namespace source.main {

	declare var SOURCE:any;
	declare var Raven:any;

	angular.module('source.main', [
		'ui.router',
		'angulartics',
		'angulartics.google.analytics',
		'angulartics.flurry',
		'source.loader',
		'source.libraries.filters',
		'source.libraries.http',
		'source.libraries.pager',
		'source.libraries.external',
		'source.libraries.ui',
		'source.source_libraries.services',
	])
		.factory('$exceptionHandler', ['$window', ($window:any) => {
			return (exception:any) => {

				console.log(exception);
				if (exception.stack) {
					console.log(exception.stack);
				}

				if (SOURCE.global.alreadyErrorTraced) {
					return;
				}

				if (!$window.Raven) {
					return;
				}

				SOURCE.global.alreadyErrorTraced = true;

				var userContext = {};
				userContext['html_source_token'] = SOURCE.config.SOURCE_TOKEN;
				userContext['user_id'] = SOURCE.global.userID;
				Raven.setUserContext(userContext);
				Raven.captureException(exception);
			}
		}])
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider'])
		.run([
			'$state',
			'$stateParams',
			'$location',
			'$timeout',
			'SourceCookie',
			'EnvironmentService',
			'MeService',
			'APICallService',
			'UiService',
            '$cacheFactory',
		]);
}
