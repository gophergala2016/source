/// <reference path="../../../_app.ts" />
namespace source.libraries.http.service {
	export class HttpService  {
		opt: any;
		xsrf_key: string;
		xsrf_token: string;

		static $inject = [
			'$http',
            '$q'
		];
		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService
		) {
			this.opt = {};
			this.opt.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
			this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		// CSRF 
		setXSRFToken(key:string, token:string){
			this.xsrf_key = key;
			this.xsrf_token = token;
		}

		// GET
		get(path:string, opt:any){
			opt = opt || {};
			opt.headers = opt.headers || {};
			return this.request('GET', path, {}, opt);
		}

		// GET
		getParams(path:string, params:any, opt:any){
			opt = opt || {};
			opt.params = params;
			return this.get(path, opt);
		}

		// POST
		post(path:string, params:any, opt:any){
			this.setup();
			opt = opt || this.opt;
			params[this.xsrf_key] = this.xsrf_token;
			return this.request('POST', path, $.param(params), opt);
		}

		// ajax
		request(type:string, path:string, params:any, opt:any){
			opt = opt || {};
			opt.url = path;
			opt.method = type;
			opt.data = params;
			return this.$http(opt);
		}

		//  POST
		postFile(path, fd, opt){
			opt = opt || {};
			opt.headers = opt.headers || {};
			opt.headers['Content-Type'] = undefined;
			opt.transformRequest = angular.identity;
			opt.contentType = false;
			opt.processData = false;
			fd.append(this.xsrf_key, this.xsrf_token);
			return this.$http.post(path, fd, opt);
		}

		// JSON POST
		postJSON(path, params, opt){
			opt = opt || {};
			opt.headers = opt.headers || {};
			opt.headers['Content-Type'] = 'application/json';
			return this.$http.post(path, params, opt);
		}

		// JSON PUT
		putJSON(path, params, opt){
			opt = opt || {};
			opt.headers = opt.headers || {};
			opt.headers['Content-Type'] = 'application/json';
			return this.$http.put(path, params, opt);
		}

		// DELETE
		delete(path, params, opt){
			opt = opt || {};
			opt.params = params;
			opt.headers = opt.headers || {};
			return this.request('DELETE', path, {}, opt);
		}

		// // PCCSRF 
		setup(){
			var port: string;
			var location: any;
			location = window.location;
			if (location.origin === undefined) {
				port = (location.port === "80" || location.port === "")? "" : ":" + location.port;
				location.origin = location.protocol + "//" + location.hostname + port;
			}
			this.$http.defaults.headers.post['X-from-origin'] = location.origin;
		}
	}
}
