/// <reference path="../../_app.ts" />

namespace source.source_libraries.directiveutil {

	export interface IPromise {
		(controller: any): ng.IPromise<any>;
	}

	interface ICallBackPremiseSuccess {
		(scope: any, element: any, controller: any, response: any): void;
	}

	interface IDirectiveOpts {
		template?: string;
		templateUrl?: any;
		controller?: any;
		link?: any;
		compile?: any;
		replace?: boolean;
		scope?: any;
		transclude?: any;
		bindToController?: any;
		controllerAs?: string;
	}


	export function commonDirective(opts: IDirectiveOpts): ng.IDirective {
		var directive: ng.IDirective = {
			restrict: 'A',
			scope   : {},
		};

		if ('templateUrl' in opts) {
			if (typeof opts.templateUrl === 'function') {
				directive.templateUrl = opts.templateUrl;
			} else {
				directive.templateUrl = '/partial/' + opts.templateUrl;
			}
		} else if ('template' in opts) {
			directive.template = opts.template;
		}
		if ('controller' in opts) {
			directive.controller   = opts.controller;
			directive.controllerAs = 'ctrl';
		}
		if ('compile' in opts) {
			directive.compile = opts.compile;
		}
		if ('link' in opts) {
			directive.link = opts.link;
		}
		if ('replace' in opts) {
			directive.replace = opts.replace;
		}
		if ('scope' in opts) {
			directive.scope = opts.scope;
		}
		if ('transclude' in opts) {
			directive.transclude = opts.transclude;
		}
		if ('bindToController' in opts) {
			directive.bindToController = opts.bindToController;
		}
		return directive;
	}

	export function renderTemplate(templateUrl: string, controller: any, link?: any): ng.IDirective {
		var opts: any = {
			templateUrl: templateUrl,
			controller : controller,
		};
		if (link !== undefined) {
			opts.link = link;
		}
		return commonDirective(opts);
	}

	// This is sample code for unit test
	export function renderTemplateNotUrl(template: string, controller: any, link?: any): ng.IDirective {
		var opts: any = {
			template  : template,
			controller: controller,
			replace   : true
		};
		if (link !== undefined) {
			opts.link = link;
		}
		return commonDirective(opts);
	}

	export function renderTemplateWithPromiseSuccess(templateUrl: string, controller: any, promise: IPromise, callback: ICallBackPremiseSuccess): ng.IDirective {
		return commonDirective({
			templateUrl: templateUrl,
			controller : controller,
			link       : ($scope, element: JQuery, attributes: any, controller: any) => {
				promise(controller)
					.then(
						response => {
						callback($scope, element, controller, response);
					},
						response => {
						console.log("renderTemplateWithPromiseSuccess: requested failed ");
						console.log(response);
					}
				);
			}
		});
	}
}
