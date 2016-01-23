/// <reference path="../../_app.ts" />

namespace Source.SourceLibraries.Controller {

	'use strict';

	export class ScrollUpPagingHelper {

		$state: any;
		$timeout: any;
		uiService: source.libraries.ui.UiService;

		changePageWithScrollUp(page: number, params: any = {}): void {
			var opt = {
				top  : 50,
				delay: 1200,
			};

			params      = params || {};
			params.page = page;

			this.$state.go(this.$state.current.name, params);
		}
	}
}

