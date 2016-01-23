/// <reference path="../../_app.ts" />
namespace source.libraries.ui {

	declare var Flipsnap: any;

	export class UiService {

		static $inject = [
			'$rootScope',
			'$window',
			'$document',
			'$compile',
			'Facebook',
			'EnvironmentService',
		];
	}
}
