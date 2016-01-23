/// <reference path="../../_app.ts" />
namespace source.libraries.ui {

    declare var SOURCE: any;

    'use strict';

    angular.module('source.libraries.ui', [])
        .service('UiService', ['$rootScope', '$window', '$document', '$compile', 'Facebook', 'EnvironmentService', source.libraries.ui.UiService])
}
