/// <reference path="../../_app.ts" />

namespace source.libraries.pager {

	'use strict';

	export class PagerService {

		constructor() {
		}

		// make pager
		createPager(currentPage: number = 1, perPage: number = 10, totalItems: number = null, range: number = 5): any {
			return new source.libraries.pager.Pager(currentPage, perPage, totalItems, range);
		}
	}
}
