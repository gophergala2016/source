/// <reference path="../../_app.ts" />

namespace Source.SourceLibraries.Services {

	'use strict';

	export class EnvironmentService {

		static $inject = [
			'$q',
			'$state'
		];

		instance: Source.Libraries.Models.Environment;

		device: string;
		country: string;
		environment: string;
		linkParam: string;

		helpUrl: string;
		landingUrl: string;
		fbFunpageUrl: string;

		constructor(private $q: ng.IQService, private $state: ng.ui.IStateService) {
			console.log('New Instance Created EnvironmentService');

			this.device      = SOURCE.config.DEVICE;
			this.country     = SOURCE.flag.COUNTRY;
			this.environment = SOURCE.config.ENVIRONMENT;
			if (this.isDeviceIos()) {
				this.linkParam = '?os=ios';
			} else if (this.isDeviceAndroid()) {
				this.linkParam = '?os=android';
			} else {
				this.linkParam = '';
			}

			this.helpUrl      = SOURCE.config.HELP_URL;
			this.landingUrl   = SOURCE.config.LANDING_URL;
			this.fbFunpageUrl = SOURCE.config.FB_FUNPAGE_URL

			this.load({
				device     : this.device,
				country    : this.country,
				environment: this.environment,
			});
		}

		load(params): void {
			this.instance = new Source.Libraries.Models.Environment(params);
		}

		fetch(): ng.IPromise<any> {
			var d = this.$q.defer();
			d.resolve(this.instance);
			return d.promise;
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

		// COUNTRY
		isCountryJp(): boolean {
			return this.country === 'jp';
		}

		isCountryTw(): boolean {
			return this.country === 'zh';
		}

		helpUrlFor(path: string): string {
			return this.helpUrl + path;
		}

		isProd(): boolean {
			return this.environment === 'prod';
		}

		isStatic(): boolean {
			var stateName = this.$state.current.name;
			return 0 === stateName.indexOf('statics');
		}

		isUserAgentIphone(): boolean {
			return this.instance.isUserAgentIphone();
		}

		isUserAgentAndroid(): boolean {
			return this.instance.isUserAgentAndroid();
		}

		isLogin(): boolean {
			var stateName = this.$state.current.name;
			return 0 === stateName.indexOf('login');
		}

		isJpLogin(): boolean {
			return this.isCountryJp() && this.isLogin();
		}
	}
}
