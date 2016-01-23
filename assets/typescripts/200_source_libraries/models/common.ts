/// <reference path="../../_app.ts" />

namespace source.libraries.models {

	'use strict';

	export class IdName {

		id:		number;
		name:	string;

		constructor(id: number = null, name: string = null) {
			this.id = id;
			this.name = name;
		}
	}

	export class Photo {

		no:				number;
		id:				number;
		src:			string;
		reviewStatus:	number;
		isDefault:		boolean;

		constructor(no: number) {
			this.no = no;
			this.id = 0;
			this.reviewStatus = 0;
			this.isDefault = true;
			this.src = this.getDefaultSrc();
		}

		protected getDefaultSrc(): string { return '/public/img/sp/icon/img_tmb_no_photo.png?v=1'; }

		inReview(): boolean { return 3 === this.reviewStatus; }
	}

	export class PhotoSP extends Photo {
		protected getDefaultSrc(): string { return '/public/img/pc/img_jp/myprofile/photo_place_holddr_profile.png?v=1'; }
	}

}
