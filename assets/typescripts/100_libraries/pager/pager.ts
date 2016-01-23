/// <reference path="../../_app.ts" />

namespace source.libraries.pager {

	'use strict';

	export class Pager {

		totalPage: number;
		numbers: number;

		constructor(public currentPage: number,
					public perPage: number,
					public totalItems: number,
					public range: number) {

			this.currentPage = +(currentPage);
			this.numbers     = +(range);
			this.totalPage   = Math.ceil(+(totalItems) / +(perPage));
		}

		itemStart(): number {
			return (this.currentPage - 1) * this.perPage;
		}

		itemEnd(): number { 
			return (this.currentPage * this.perPage) - 1;
		}

		itemStartCount(): number {
			return (this.currentPage - 1) * this.perPage + 1;
		}

		itemEndCount(): number {
			var page_end = (this.currentPage * this.perPage);

			return Math.min(page_end, this.totalItems);
		}

		pageStart(): number {
			var half_num = Math.floor(this.numbers / 2),
				min      = (this.totalPage > this.numbers) ? this.totalPage : this.numbers;

			if (this.currentPage <= half_num) {
				return 1;
			}
			if ((this.totalPage - this.currentPage) <= half_num) {
				return min - this.numbers + 1;
			}
			return this.currentPage - half_num;
		}

		pageEnd(): number { 
			var half_num = Math.floor(this.numbers / 2),
				max      = (this.totalPage < this.numbers) ? this.totalPage : this.numbers;
			if (this.currentPage <= half_num) {
				return max;
			}
			if ((this.totalPage - this.currentPage) <= half_num) {
				return this.totalPage;
			}
			return this.currentPage + half_num;
		}

		canShowPagerStart(): boolean { 
			return this.currentPage > 1;
		}

		canShowPagerEnd(): boolean { 
			return this.currentPage < this.totalPage;
		}

		nextPage(): number {
			return +(this.currentPage) + 1;
		}

		prevPage(): number {
			return +(this.currentPage) - 1;
		}

		hasNextPage(): boolean {
			return this.nextPage() <= this.totalPage;
		}

		hasPrevPage(): boolean {
			return this.prevPage() > 0;
		}

		startPositionInCurrentPage(): number {
			return (this.currentPage - 1) * this.perPage + 1;
		}

		endPositionInCurrentPage(): number {
			return (this.currentPage - 1) * this.perPage + this.currentPageItems();
		}

		currentPageItems(): number {
			if (this.currentPage < this.totalPage) {
				return this.perPage;
			}

			return (this.totalItems % this.perPage === 0) ? this.perPage : this.totalItems % this.perPage;
		}
	}
}
