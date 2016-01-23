/// <reference path="../../../_app.ts" />
namespace source.loader.directive {

	export function loaderView($rootScope):ng.IDirective {

		return source.source_libraries.directiveutil.renderTemplate(
			'common/loader/loader',

			source.loader.controller.LoaderController,

			(scope:any, loaderView:any, attributes:any, controller:any) => {
				var forceLoading = false;

				$rootScope.$on('do_force_loading_begin', () => {
					forceLoading = true;
				});
				$rootScope.$on('do_force_loading_finish', () => {
					forceLoading = false;
				});

				var timer;
				var rotationBegin = () => {
					// CSS3
					var count = 0;

					function rotate() {
						var elem5 = document.getElementById('ballLoading');
						if (elem5 == null) {
							return;
						}
						(<any>elem5).style.MozTransform = 'rotate(' + count + 'deg)';
						(<any>elem5).style.WebkitTransform = 'rotate(' + count + 'deg)';
						if (count === 360) {
							count = 0;
						}
						count += 45;
					}

					timer = controller.interval(rotate, 100);
				};
				var rotationFinish = () => {
					if (timer) {
						controller.interval.cancel(timer);
					}
				};

				scope.isLoading = () => {
					var ignoreLoadingAPIs = [
						'/1.0/me',
						'/partial',
					];
					var requests = controller.http.pendingRequests.filter((r) => {
						if (r.method != 'GET') {
							return true;
						}
						var matched = ignoreLoadingAPIs.filter((api) => {
							var re = new RegExp(api);
							return !!re.exec(r.url);
						});
						return matched.length === 0;
					});
					return requests.length > 0 || forceLoading;
				};

				scope.$watch(scope.isLoading, (loadingResult) => {
					console.log('watch', loadingResult);

					// http
					if (loadingResult) {
						// 
						controller.UiService.centeringWindow($("#ajax_loading_inner > *"), 50, 50);

						rotationBegin();
						$(loaderView).show();
						$("#ajax_loading_inner > *").show(50);
						$("#ajax_loading_inner").show(50);

						// http
					} else {
						controller.timeout(() => {
							$("#ajax_loading_inner > *").hide(50);
							$("#ajax_loading_inner").hide(50);
							rotationFinish();
							$(loaderView).hide();
						}, 100);

						scope.$root.$emit('doneLoading'); // main.ts
					}
				});

			}
		);

	}

}
