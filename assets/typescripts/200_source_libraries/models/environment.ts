/// <reference path="../../_app.ts" />

namespace Source.Libraries.Models {

	'use strict';

	export class Environment {

		device: string
		country: string
		linkParam: string

		constructor(params: any) {
			this.load(params);
		}

		load(params: any): void {
			this.device    = params.device;
			this.country   = params.country;

			if (this.isDeviceIos()) {
				this.linkParam = '?os=ios';
			} else if (this.isDeviceAndroid()) {
				this.linkParam = '?os=android';
			} else {
				this.linkParam = '';
			}
		}

		// DEVICE
		isDevicePc(): boolean {
			return this.device === 'pc';
		}

		isDeviceSp(): boolean {
			return this.device === 'sp';
		}

		isDeviceIos(): boolean {
			return this.device === 'ios';
		}

		isDeviceAndroid(): boolean {
			return this.device === 'android';
		}

		isDeviceWeb(): boolean {
			return this.isDevicePc() || this.isDeviceSp();
		}

		isDeviceNative(): boolean {
			return this.isDeviceIos() || this.isDeviceAndroid();
		}

		isUserAgentIphone(): boolean {
			return navigator.userAgent.toLowerCase().indexOf('iphone') > 0
		}

		isUserAgentAndroid(): boolean {
			return navigator.userAgent.toLowerCase().indexOf('android') > 0
		}

		// COUNTRY
		isCountryJp(): boolean {
			return this.country === 'jp'
		}

		isCountryTw(): boolean {
			return this.country === 'zh'
		}
	}
}
