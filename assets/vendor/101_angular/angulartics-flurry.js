(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc overview
 * @name angulartics.flurry
 * Enables analytics support for flurry (http://flurry.com)
 */
angular.module('angulartics.flurry', ['angulartics'])
.config(['$analyticsProvider', function ($analyticsProvider) {


  $analyticsProvider.registerPageTrack(function (path) {
    //No separate track page functionality
  });

  $analyticsProvider.registerEventTrack(function (action, properties) {
    FlurryAgent.logEvent(action, properties);
  });

}]);

})(window, window.angular);
