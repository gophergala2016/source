/// <reference path="../../_app.ts" />

namespace source.api {

	'use strict';

	declare var SOURCE: any;

	export interface IValidTokenRequestData {
		device: string;
		version: string;
	}
}
