/// <reference path="../typings/tsd.d.ts" />
// Angular 2
var angular2_1 = require('angular2/angular2');
// Angular's router injectables services/bindings
var router_1 = require('angular2/router');
// Angular's form injectables services/bindings
var formInjectables_1 = require('./common/formInjectables');
var services_1 = require('./services/services');
var pages_1 = require('./pages/pages');
angular2_1.bootstrap(pages_1.App, [
    formInjectables_1.formInjectables,
    services_1.appServicesInjectables,
    router_1.routerInjectables
]);

//# sourceMappingURL=index.js.map
