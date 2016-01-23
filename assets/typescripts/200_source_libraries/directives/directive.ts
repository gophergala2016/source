/// <reference path="../../_app.ts" />

namespace source.component.directive {

	// jquery.customSelect directive
	export function customSelect($timeout: ng.ITimeoutService): ng.IDirective {
		return source.source_libraries.directiveutil.commonDirective({
			scope   : {
				id            : '@',
				modelObjectKey: '@',
				watchVal      : '=ngModel'
			},
			link    : (scope, element, attributes) => {
				if (element[0].tagName === 'SELECT' && !element.hasClass('hasCustomSelect')) {
					(<any>$(element)).customSelect();
					$(<any>element).trigger('change.customSelect');

					scope.$watch('watchVal', function (newValue, oldValue) {
						if (newValue instanceof Object) {
							if (newValue[scope.modelObjectKey]) {
								$(<any>element).val(newValue[scope.modelObjectKey]).trigger('change.customSelect');
							} else {
								$(<any>element).val(newValue[scope.id]).trigger('change.customSelect');
							}
						} else if (typeof newValue == 'number' || typeof newValue == 'string') {
							$timeout(() => {
								$(<any>element).trigger('change.customSelect');
							}, 10);
						} else {
							$(<any>element).val(newValue).trigger('change.customSelect');
						}
					}, true);
				}
			}
		});
	}

	export function perfectScrollbar(): ng.IDirective {
		return source.source_libraries.directiveutil.commonDirective({
			scope: false,
			link : (scope, element, attributes) => {
				(<any>$(element)).perfectScrollbar();
			}
		});
	}

	export function slideToggle(): ng.IDirective {
		return source.source_libraries.directiveutil.commonDirective({
			scope: false,
			link : (scope, element, attributes) => {
				element.click(() => {
					var $toggleContents = element.next();
					$toggleContents.slideToggle();
				});
			}
		});
	}

	export function convertToNumber(): ng.IDirective {
		return {
			require: 'ngModel',
			link   : function (scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function (val) {
					return parseInt(val, 10);
				});
				ngModel.$formatters.push(function (val) {
					return '' + val;
				});
			}
		};
	}

}
