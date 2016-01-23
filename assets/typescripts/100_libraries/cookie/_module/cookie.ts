/// <reference path="../../../_app.ts" />

namespace source.libraries.cookie {

    declare var SOURCE: any;

    'use strict';

    angular.module('source.libraries.cookie', [
        'ipCookie'
    ])
	.service('SourceCookie', ['ipCookie', source.libraries.cookie.service.SourceCookie]);
}
