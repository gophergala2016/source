/// <reference path="../../../_app.ts" />
namespace source.libraries.http {

	'use strict';

	angular.module('source.libraries.http', [])
		.service('HttpService', ['$http', '$q', source.libraries.http.service.HttpService])
}
