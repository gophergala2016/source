SOURCE.string = {};
SOURCE.string.countLengthByte = function (str) {
    if (!str)
        return 0;
    var r = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
            r += 1;
        }
        else {
            r += 2;
        }
    }
    return r;
};
SOURCE.string.countLength = function (str) {
    return SOURCE.string.countLengthByte(str) / 2;
};
SOURCE.date = {};
SOURCE.date.groupByDate = function (records, propertyName) {
    var results = [];
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var dateStr = record[propertyName];
        var date = new Date(dateStr);
        var yyyy = date.getFullYear().toString();
        var mm = (1 + date.getMonth()).toString();
        var dd = date.getDate().toString();
        var key = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
        var existsArrIdx = -1;
        for (var j = 0; j < results.length; j++) {
            if (key === results[j].key) {
                existsArrIdx = j;
                break;
            }
        }
        if (-1 === existsArrIdx) {
            results.push({ key: key, records: [record] });
        }
        else {
            results[existsArrIdx].records.push(record);
        }
    }
    return results;
};
SOURCE.collection = {};
SOURCE.collection.masterDataOptions = function (properties, withProperty) {
    if (withProperty === void 0) { withProperty = null; }
    var options = [];
    for (var i = 0; i < properties.length; i++) {
        var property = properties[i];
        if (property.id <= 0) {
            continue;
        }
        var option = { value: property.id, label: property.name };
        if (withProperty) {
            option[withProperty] = property[withProperty];
        }
        options.push(option);
    }
    return options;
};
SOURCE.existsFacebookNamespace = function () {
    return SOURCE.config.FACEBOOK_NAMESPACE && 0 < SOURCE.config.FACEBOOK_NAMESPACE.length;
};
SOURCE.anchorExists = function () {
    return SOURCE.utmJump.anchor.length && -1 === SOURCE.utmJump.anchor.indexOf('/');
};
SOURCE.moveAnchor = function () {
    var target = $(SOURCE.utmJump.anchor);
    if (0 < target.length) {
        $(window).scrollTop(target.offset().top);
    }
    SOURCE.utmJump.anchor = '';
};
SOURCE.util = {};
SOURCE.util.createUrl = function (path) {
    return location.protocol + '//' + location.host + path;
};
SOURCE.util.convertToUtcString = function (_base, add) {
    if (add === void 0) { add = {}; }
    var base = new Date(_base);
    if (add.day) {
        base.setDate(base.getDate() + add.day);
    }
    if (add.sec) {
        base.setSeconds(base.getSeconds() + add.sec);
    }
    var yyyy = base.getUTCFullYear();
    var MM = ('0' + (base.getUTCMonth() + 1)).slice(-2);
    var dd = ('0' + base.getUTCDate()).slice(-2);
    var HH = ('0' + base.getUTCHours()).slice(-2);
    var mm = ('0' + base.getUTCMinutes()).slice(-2);
    var ss = ('0' + base.getUTCSeconds()).slice(-2);
    return yyyy + '-' + MM + '-' + dd + 'T' + HH + ':' + mm + ':' + ss + 'Z';
};
SOURCE.util.dateDiff = function (_start, _end, state) {
    if (_start === void 0) { _start = ''; }
    if (_end === void 0) { _end = ''; }
    if (state === void 0) { state = 'day'; }
    var start = (_start !== '') ? new Date(_start) : new Date();
    var end = (_end !== '') ? new Date(_end) : new Date();
    var msDiff = end.getTime() - start.getTime();
    if ('sec' === state) {
        return Math.floor(msDiff / 1000);
    }
    else if ('min' === state) {
        return Math.floor(msDiff / (1000 * 60));
    }
    else if ('hour' === state) {
        return Math.floor(msDiff / (1000 * 60 * 60));
    }
    else if ('day' === state) {
        return Math.floor(msDiff / (1000 * 60 * 60 * 24));
    }
    else if ('year' === state) {
        return Math.floor(msDiff / (1000 * 60 * 60 * 24 * 12));
    }
    return Math.floor(msDiff / (1000 * 60 * 60 * 24));
};
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var cookie;
        (function (cookie) {
            var service;
            (function (service) {
                var SourceCookie = (function () {
                    function SourceCookie(ipCookie) {
                        this.ipCookie = ipCookie;
                        console.log('new Instance SourceCookie');
                        if (SOURCE.config.SOURCE_TOKEN) {
                            this.source_token = SOURCE.config.SOURCE_TOKEN;
                            SOURCE.config.SOURCE_TOKEN = null;
                        }
                    }
                    Object.defineProperty(SourceCookie.prototype, "source_token", {
                        get: function () {
                            return this.ipCookie('source_token');
                        },
                        set: function (value) {
                            this.ipCookie('source_token', value);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SourceCookie.prototype, "user_id", {
                        get: function () {
                            return this.ipCookie('user_id');
                        },
                        set: function (value) {
                            this.ipCookie('user_id', value);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    SourceCookie.$inject = [
                        'ipCookie'
                    ];
                    return SourceCookie;
                })();
                service.SourceCookie = SourceCookie;
            })(service = cookie.service || (cookie.service = {}));
        })(cookie = libraries.cookie || (libraries.cookie = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var cookie;
        (function (cookie) {
            'use strict';
            angular.module('source.libraries.cookie', [
                'ipCookie'
            ])
                .service('SourceCookie', ['ipCookie', source.libraries.cookie.service.SourceCookie]);
        })(cookie = libraries.cookie || (libraries.cookie = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var http;
        (function (http) {
            var service;
            (function (service) {
                var HttpService = (function () {
                    function HttpService($http, $q) {
                        this.$http = $http;
                        this.$q = $q;
                        this.opt = {};
                        this.opt.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
                        this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                    }
                    HttpService.prototype.setXSRFToken = function (key, token) {
                        this.xsrf_key = key;
                        this.xsrf_token = token;
                    };
                    HttpService.prototype.get = function (path, opt) {
                        opt = opt || {};
                        opt.headers = opt.headers || {};
                        return this.request('GET', path, {}, opt);
                    };
                    HttpService.prototype.getParams = function (path, params, opt) {
                        opt = opt || {};
                        opt.params = params;
                        return this.get(path, opt);
                    };
                    HttpService.prototype.post = function (path, params, opt) {
                        this.setup();
                        opt = opt || this.opt;
                        params[this.xsrf_key] = this.xsrf_token;
                        return this.request('POST', path, $.param(params), opt);
                    };
                    HttpService.prototype.request = function (type, path, params, opt) {
                        opt = opt || {};
                        opt.url = path;
                        opt.method = type;
                        opt.data = params;
                        return this.$http(opt);
                    };
                    HttpService.prototype.postFile = function (path, fd, opt) {
                        opt = opt || {};
                        opt.headers = opt.headers || {};
                        opt.headers['Content-Type'] = undefined;
                        opt.transformRequest = angular.identity;
                        opt.contentType = false;
                        opt.processData = false;
                        fd.append(this.xsrf_key, this.xsrf_token);
                        return this.$http.post(path, fd, opt);
                    };
                    HttpService.prototype.postJSON = function (path, params, opt) {
                        opt = opt || {};
                        opt.headers = opt.headers || {};
                        opt.headers['Content-Type'] = 'application/json';
                        return this.$http.post(path, params, opt);
                    };
                    HttpService.prototype.putJSON = function (path, params, opt) {
                        opt = opt || {};
                        opt.headers = opt.headers || {};
                        opt.headers['Content-Type'] = 'application/json';
                        return this.$http.put(path, params, opt);
                    };
                    HttpService.prototype.delete = function (path, params, opt) {
                        opt = opt || {};
                        opt.params = params;
                        opt.headers = opt.headers || {};
                        return this.request('DELETE', path, {}, opt);
                    };
                    HttpService.prototype.setup = function () {
                        var port;
                        var location;
                        location = window.location;
                        if (location.origin === undefined) {
                            port = (location.port === "80" || location.port === "") ? "" : ":" + location.port;
                            location.origin = location.protocol + "//" + location.hostname + port;
                        }
                        this.$http.defaults.headers.post['X-from-origin'] = location.origin;
                    };
                    HttpService.$inject = [
                        '$http',
                        '$q'
                    ];
                    return HttpService;
                })();
                service.HttpService = HttpService;
            })(service = http.service || (http.service = {}));
        })(http = libraries.http || (libraries.http = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var http;
        (function (http) {
            'use strict';
            angular.module('source.libraries.http', [])
                .service('HttpService', ['$http', '$q', source.libraries.http.service.HttpService]);
        })(http = libraries.http || (libraries.http = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var pager;
        (function (pager) {
            'use strict';
            var Pager = (function () {
                function Pager(currentPage, perPage, totalItems, range) {
                    this.currentPage = currentPage;
                    this.perPage = perPage;
                    this.totalItems = totalItems;
                    this.range = range;
                    this.currentPage = +(currentPage);
                    this.numbers = +(range);
                    this.totalPage = Math.ceil(+(totalItems) / +(perPage));
                }
                Pager.prototype.itemStart = function () {
                    return (this.currentPage - 1) * this.perPage;
                };
                Pager.prototype.itemEnd = function () {
                    return (this.currentPage * this.perPage) - 1;
                };
                Pager.prototype.itemStartCount = function () {
                    return (this.currentPage - 1) * this.perPage + 1;
                };
                Pager.prototype.itemEndCount = function () {
                    var page_end = (this.currentPage * this.perPage);
                    return Math.min(page_end, this.totalItems);
                };
                Pager.prototype.pageStart = function () {
                    var half_num = Math.floor(this.numbers / 2), min = (this.totalPage > this.numbers) ? this.totalPage : this.numbers;
                    if (this.currentPage <= half_num) {
                        return 1;
                    }
                    if ((this.totalPage - this.currentPage) <= half_num) {
                        return min - this.numbers + 1;
                    }
                    return this.currentPage - half_num;
                };
                Pager.prototype.pageEnd = function () {
                    var half_num = Math.floor(this.numbers / 2), max = (this.totalPage < this.numbers) ? this.totalPage : this.numbers;
                    if (this.currentPage <= half_num) {
                        return max;
                    }
                    if ((this.totalPage - this.currentPage) <= half_num) {
                        return this.totalPage;
                    }
                    return this.currentPage + half_num;
                };
                Pager.prototype.canShowPagerStart = function () {
                    return this.currentPage > 1;
                };
                Pager.prototype.canShowPagerEnd = function () {
                    return this.currentPage < this.totalPage;
                };
                Pager.prototype.nextPage = function () {
                    return +(this.currentPage) + 1;
                };
                Pager.prototype.prevPage = function () {
                    return +(this.currentPage) - 1;
                };
                Pager.prototype.hasNextPage = function () {
                    return this.nextPage() <= this.totalPage;
                };
                Pager.prototype.hasPrevPage = function () {
                    return this.prevPage() > 0;
                };
                Pager.prototype.startPositionInCurrentPage = function () {
                    return (this.currentPage - 1) * this.perPage + 1;
                };
                Pager.prototype.endPositionInCurrentPage = function () {
                    return (this.currentPage - 1) * this.perPage + this.currentPageItems();
                };
                Pager.prototype.currentPageItems = function () {
                    if (this.currentPage < this.totalPage) {
                        return this.perPage;
                    }
                    return (this.totalItems % this.perPage === 0) ? this.perPage : this.totalItems % this.perPage;
                };
                return Pager;
            })();
            pager.Pager = Pager;
        })(pager = libraries.pager || (libraries.pager = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var pager;
        (function (pager) {
            'use strict';
            var PagerService = (function () {
                function PagerService() {
                }
                PagerService.prototype.createPager = function (currentPage, perPage, totalItems, range) {
                    if (currentPage === void 0) { currentPage = 1; }
                    if (perPage === void 0) { perPage = 10; }
                    if (totalItems === void 0) { totalItems = null; }
                    if (range === void 0) { range = 5; }
                    return new source.libraries.pager.Pager(currentPage, perPage, totalItems, range);
                };
                return PagerService;
            })();
            pager.PagerService = PagerService;
        })(pager = libraries.pager || (libraries.pager = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var pager;
        (function (pager) {
            'use strict';
            angular.module('source.libraries.pager', [
                'source.libraries.ui'
            ])
                .service('PagerService', ['$state', '$timeout', 'UiService', source.libraries.pager.PagerService]);
        })(pager = libraries.pager || (libraries.pager = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var ui;
        (function (ui) {
            var UiService = (function () {
                function UiService() {
                }
                UiService.$inject = [
                    '$rootScope',
                    '$window',
                    '$document',
                    '$compile',
                    'Facebook',
                    'EnvironmentService',
                ];
                return UiService;
            })();
            ui.UiService = UiService;
        })(ui = libraries.ui || (libraries.ui = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var ui;
        (function (ui) {
            'use strict';
            angular.module('source.libraries.ui', [])
                .service('UiService', ['$rootScope', '$window', '$document', '$compile', 'Facebook', 'EnvironmentService', source.libraries.ui.UiService]);
        })(ui = libraries.ui || (libraries.ui = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var source;
(function (source) {
    var api;
    (function (api) {
        'use strict';
    })(api = source.api || (source.api = {}));
})(source || (source = {}));
var source;
(function (source) {
    var api;
    (function (api) {
        'use strict';
        var APIService = (function () {
            function APIService(httpService, $q, sourceCookie) {
                this.httpService = httpService;
                this.$q = $q;
                this.sourceCookie = sourceCookie;
                console.log('new Instance APIService');
            }
            APIService.prototype.getVersion = function () {
                return SOURCE.config.VERSION;
            };
            APIService.prototype.buildParams = function (addParams) {
                var params = {
                    device: SOURCE.config.DEVICE,
                    version: this.getVersion(),
                };
                return $.extend(params, addParams);
            };
            APIService.prototype.apiCallPost = function (path, addParams) {
                var _this = this;
                return this.apiCall(path, addParams, function (path, addParams) {
                    return _this.httpService.postJSON(path, addParams);
                });
            };
            APIService.prototype.apiCallGet = function (path, addParams) {
                var _this = this;
                var params = this.buildParams(addParams);
                return this.apiCall(path, params, function (path, addParams) {
                    return _this.httpService.getParams(path, addParams);
                });
            };
            APIService.prototype.apiCallPut = function (path, addParams) {
                var _this = this;
                return this.apiCall(path, addParams, function (path, addParams) {
                    return _this.httpService.putJSON(path, addParams);
                });
            };
            APIService.prototype.apiCallDelete = function (path, addParams) {
                var _this = this;
                return this.apiCall(path, addParams, function (path, addParams) {
                    return _this.httpService.delete(path, addParams);
                });
            };
            APIService.prototype.apiCall = function (path, addParams, method) {
                var params = this.buildParams(addParams);
                var dfd = this.$q.defer();
                method(path, params)
                    .success(function (response) {
                    return dfd.resolve(response);
                })
                    .error(function (response) {
                    return dfd.reject(response);
                });
                return dfd.promise;
            };
            APIService.prototype.getSyncAjax = function (path, addParams) {
                return this.syncAjax('GET', path, addParams);
            };
            APIService.prototype.postSyncAjax = function (path, addParams) {
                return this.syncJsonAjax('POST', path, addParams);
            };
            APIService.prototype.putSyncAjax = function (path, addParams) {
                return this.syncJsonAjax('PUT', path, addParams);
            };
            APIService.prototype.deleteSyncAjax = function (path, addParams) {
                return this.syncAjax('DELETE', path, addParams);
            };
            APIService.prototype.formalApiPath = function (path) {
                return '/1.0/' + path;
            };
            APIService.prototype.syncJsonAjax = function (method, path, addParams) {
                var params = this.buildParams(addParams);
                var response = $.ajax({
                    url: this.formalApiPath(path),
                    type: method,
                    headers: {
                        'Source-Token': this.sourceCookie.source_token
                    },
                    data: JSON.stringify(params),
                    contentType: 'application/json',
                    async: false
                }).responseText;
                return JSON.parse(response);
            };
            APIService.prototype.syncAjax = function (method, path, addParams) {
                var params = this.buildParams(addParams);
                var response = $.ajax({
                    url: this.formalApiPath(path) + '?' + $.param(params),
                    type: method,
                    headers: {
                        'Source-Token': this.sourceCookie.source_token
                    },
                    async: false
                });
                if (0 < response.responseText.length) {
                    return JSON.parse(response.responseText);
                }
                return null;
            };
            APIService.$inject = [
                'HttpService',
                '$q',
                'SourceCookie',
            ];
            return APIService;
        })();
        api.APIService = APIService;
    })(api = source.api || (source.api = {}));
})(source || (source = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var source;
(function (source) {
    var api;
    (function (api) {
        'use strict';
        var APICallService = (function (_super) {
            __extends(APICallService, _super);
            function APICallService(httpService, $q, sourceCookie, $state) {
                _super.call(this, httpService, $q, sourceCookie);
                this.httpService = httpService;
                this.$q = $q;
                this.sourceCookie = sourceCookie;
                this.$state = $state;
                this.defaultAPIVersion = '1.0';
            }
            APICallService.prototype.getServiceAuth = function () {
                return null;
            };
            APICallService.prototype.versioningPath = function (path) {
                return '/' + this.defaultAPIVersion + '/' + path;
            };
            APICallService.prototype.getMe = function () {
                return this.apiCallGet(this.versioningPath('me'), {});
            };
            APICallService.$inject = [
                'HttpService',
                '$q',
                'SourceCookie',
                '$state',
            ];
            return APICallService;
        })(api.APIService);
        api.APICallService = APICallService;
    })(api = source.api || (source.api = {}));
})(source || (source = {}));
var source;
(function (source) {
    var libraries;
    (function (libraries) {
        var models;
        (function (models) {
            'use strict';
            var IdName = (function () {
                function IdName(id, name) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    this.id = id;
                    this.name = name;
                }
                return IdName;
            })();
            models.IdName = IdName;
            var Photo = (function () {
                function Photo(no) {
                    this.no = no;
                    this.id = 0;
                    this.reviewStatus = 0;
                    this.isDefault = true;
                    this.src = this.getDefaultSrc();
                }
                Photo.prototype.getDefaultSrc = function () { return '/public/img/sp/icon/img_tmb_no_photo.png?v=1'; };
                Photo.prototype.inReview = function () { return 3 === this.reviewStatus; };
                return Photo;
            })();
            models.Photo = Photo;
            var PhotoSP = (function (_super) {
                __extends(PhotoSP, _super);
                function PhotoSP() {
                    _super.apply(this, arguments);
                }
                PhotoSP.prototype.getDefaultSrc = function () { return '/public/img/pc/img_jp/myprofile/photo_place_holddr_profile.png?v=1'; };
                return PhotoSP;
            })(Photo);
            models.PhotoSP = PhotoSP;
        })(models = libraries.models || (libraries.models = {}));
    })(libraries = source.libraries || (source.libraries = {}));
})(source || (source = {}));
var Source;
(function (Source) {
    var Libraries;
    (function (Libraries) {
        var Models;
        (function (Models) {
            'use strict';
            var Environment = (function () {
                function Environment(params) {
                    this.load(params);
                }
                Environment.prototype.load = function (params) {
                    this.device = params.device;
                    this.country = params.country;
                    if (this.isDeviceIos()) {
                        this.linkParam = '?os=ios';
                    }
                    else if (this.isDeviceAndroid()) {
                        this.linkParam = '?os=android';
                    }
                    else {
                        this.linkParam = '';
                    }
                };
                Environment.prototype.isDevicePc = function () {
                    return this.device === 'pc';
                };
                Environment.prototype.isDeviceSp = function () {
                    return this.device === 'sp';
                };
                Environment.prototype.isDeviceIos = function () {
                    return this.device === 'ios';
                };
                Environment.prototype.isDeviceAndroid = function () {
                    return this.device === 'android';
                };
                Environment.prototype.isDeviceWeb = function () {
                    return this.isDevicePc() || this.isDeviceSp();
                };
                Environment.prototype.isDeviceNative = function () {
                    return this.isDeviceIos() || this.isDeviceAndroid();
                };
                Environment.prototype.isUserAgentIphone = function () {
                    return navigator.userAgent.toLowerCase().indexOf('iphone') > 0;
                };
                Environment.prototype.isUserAgentAndroid = function () {
                    return navigator.userAgent.toLowerCase().indexOf('android') > 0;
                };
                Environment.prototype.isCountryJp = function () {
                    return this.country === 'jp';
                };
                Environment.prototype.isCountryTw = function () {
                    return this.country === 'zh';
                };
                return Environment;
            })();
            Models.Environment = Environment;
        })(Models = Libraries.Models || (Libraries.Models = {}));
    })(Libraries = Source.Libraries || (Source.Libraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var Libraries;
    (function (Libraries) {
        var Models;
        (function (Models) {
            var Error = (function () {
                function Error(message, title) {
                    if (!title) {
                        title = '';
                    }
                    this.message = message.replace(/%s/g, '`').replace(/\\n/g, "\n");
                    this.title = title.replace(/%s/g, '`').replace(/\\n/g, "\n");
                }
                Error.prototype.isTitleNone = function () {
                    return this.title === '';
                };
                Error.prototype.hasTitle = function () {
                    return this.title !== '';
                };
                Error.prototype.hasMessage = function () {
                    return this.message !== '';
                };
                return Error;
            })();
            Models.Error = Error;
        })(Models = Libraries.Models || (Libraries.Models = {}));
    })(Libraries = Source.Libraries || (Source.Libraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Services;
        (function (Services) {
            'use strict';
            var EnvironmentService = (function () {
                function EnvironmentService($q, $state) {
                    this.$q = $q;
                    this.$state = $state;
                    console.log('New Instance Created EnvironmentService');
                    this.device = SOURCE.config.DEVICE;
                    this.country = SOURCE.flag.COUNTRY;
                    this.environment = SOURCE.config.ENVIRONMENT;
                    if (this.isDeviceIos()) {
                        this.linkParam = '?os=ios';
                    }
                    else if (this.isDeviceAndroid()) {
                        this.linkParam = '?os=android';
                    }
                    else {
                        this.linkParam = '';
                    }
                    this.helpUrl = SOURCE.config.HELP_URL;
                    this.landingUrl = SOURCE.config.LANDING_URL;
                    this.fbFunpageUrl = SOURCE.config.FB_FUNPAGE_URL;
                    this.load({
                        device: this.device,
                        country: this.country,
                        environment: this.environment,
                    });
                }
                EnvironmentService.prototype.load = function (params) {
                    this.instance = new Source.Libraries.Models.Environment(params);
                };
                EnvironmentService.prototype.fetch = function () {
                    var d = this.$q.defer();
                    d.resolve(this.instance);
                    return d.promise;
                };
                EnvironmentService.prototype.isDevicePc = function () {
                    return this.device === 'pc';
                };
                EnvironmentService.prototype.isDeviceSp = function () {
                    return this.device === 'sp';
                };
                EnvironmentService.prototype.isDeviceIos = function () {
                    return this.device === 'ios';
                };
                EnvironmentService.prototype.isDeviceAndroid = function () {
                    return this.device === 'android';
                };
                EnvironmentService.prototype.isDeviceWeb = function () {
                    return this.isDevicePc() || this.isDeviceSp();
                };
                EnvironmentService.prototype.isDeviceNative = function () {
                    return this.isDeviceIos() || this.isDeviceAndroid();
                };
                EnvironmentService.prototype.isCountryJp = function () {
                    return this.country === 'jp';
                };
                EnvironmentService.prototype.isCountryTw = function () {
                    return this.country === 'zh';
                };
                EnvironmentService.prototype.helpUrlFor = function (path) {
                    return this.helpUrl + path;
                };
                EnvironmentService.prototype.isProd = function () {
                    return this.environment === 'prod';
                };
                EnvironmentService.prototype.isStatic = function () {
                    var stateName = this.$state.current.name;
                    return 0 === stateName.indexOf('statics');
                };
                EnvironmentService.prototype.isUserAgentIphone = function () {
                    return this.instance.isUserAgentIphone();
                };
                EnvironmentService.prototype.isUserAgentAndroid = function () {
                    return this.instance.isUserAgentAndroid();
                };
                EnvironmentService.prototype.isLogin = function () {
                    var stateName = this.$state.current.name;
                    return 0 === stateName.indexOf('login');
                };
                EnvironmentService.prototype.isJpLogin = function () {
                    return this.isCountryJp() && this.isLogin();
                };
                EnvironmentService.$inject = [
                    '$q',
                    '$state'
                ];
                return EnvironmentService;
            })();
            Services.EnvironmentService = EnvironmentService;
        })(Services = SourceLibraries.Services || (SourceLibraries.Services = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Services;
        (function (Services) {
            'use strict';
            var ErrorService = (function () {
                function ErrorService($state, api) {
                    this.$state = $state;
                    this.api = api;
                }
                ErrorService.prototype.set = function (error) {
                    this.error = error;
                };
                ErrorService.prototype.getAndReset = function () {
                    if (!this.error) {
                        var error = new Source.Libraries.Models.Error('', '');
                    }
                    else {
                        var error = new Source.Libraries.Models.Error(this.error.message, this.error.title);
                    }
                    this.reset();
                    return error;
                };
                ErrorService.prototype.reset = function () {
                    this.error = null;
                };
                ErrorService.$inject = [
                    '$state',
                    'APICallService',
                ];
                return ErrorService;
            })();
            Services.ErrorService = ErrorService;
        })(Services = SourceLibraries.Services || (SourceLibraries.Services = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Services;
        (function (Services) {
            'use strict';
            angular.module('source.source_libraries.services', [
                'source.component',
            ])
                .service('EnvironmentService', ['$q', '$state', Services.EnvironmentService])
                .service('ErrorService', ['$state', 'APICallService', Services.ErrorService]);
        })(Services = SourceLibraries.Services || (SourceLibraries.Services = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Controller;
        (function (Controller) {
            'use strict';
            var ApplicationController = (function () {
                function ApplicationController($rootScope) {
                    this.$rootScope = $rootScope;
                }
                ApplicationController.$inject = [
                    '$rootScope',
                ];
                return ApplicationController;
            })();
            Controller.ApplicationController = ApplicationController;
        })(Controller = SourceLibraries.Controller || (SourceLibraries.Controller = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Controller;
        (function (Controller) {
            'use strict';
            var ScrollUpPagingHelper = (function () {
                function ScrollUpPagingHelper() {
                }
                ScrollUpPagingHelper.prototype.changePageWithScrollUp = function (page, params) {
                    if (params === void 0) { params = {}; }
                    var opt = {
                        top: 50,
                        delay: 1200,
                    };
                    params = params || {};
                    params.page = page;
                    this.$state.go(this.$state.current.name, params);
                };
                return ScrollUpPagingHelper;
            })();
            Controller.ScrollUpPagingHelper = ScrollUpPagingHelper;
        })(Controller = SourceLibraries.Controller || (SourceLibraries.Controller = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var source;
(function (source) {
    var component;
    (function (component) {
        var directive;
        (function (directive) {
            function customSelect($timeout) {
                return source.source_libraries.directiveutil.commonDirective({
                    scope: {
                        id: '@',
                        modelObjectKey: '@',
                        watchVal: '=ngModel'
                    },
                    link: function (scope, element, attributes) {
                        if (element[0].tagName === 'SELECT' && !element.hasClass('hasCustomSelect')) {
                            $(element).customSelect();
                            $(element).trigger('change.customSelect');
                            scope.$watch('watchVal', function (newValue, oldValue) {
                                if (newValue instanceof Object) {
                                    if (newValue[scope.modelObjectKey]) {
                                        $(element).val(newValue[scope.modelObjectKey]).trigger('change.customSelect');
                                    }
                                    else {
                                        $(element).val(newValue[scope.id]).trigger('change.customSelect');
                                    }
                                }
                                else if (typeof newValue == 'number' || typeof newValue == 'string') {
                                    $timeout(function () {
                                        $(element).trigger('change.customSelect');
                                    }, 10);
                                }
                                else {
                                    $(element).val(newValue).trigger('change.customSelect');
                                }
                            }, true);
                        }
                    }
                });
            }
            directive.customSelect = customSelect;
            function perfectScrollbar() {
                return source.source_libraries.directiveutil.commonDirective({
                    scope: false,
                    link: function (scope, element, attributes) {
                        $(element).perfectScrollbar();
                    }
                });
            }
            directive.perfectScrollbar = perfectScrollbar;
            function slideToggle() {
                return source.source_libraries.directiveutil.commonDirective({
                    scope: false,
                    link: function (scope, element, attributes) {
                        element.click(function () {
                            var $toggleContents = element.next();
                            $toggleContents.slideToggle();
                        });
                    }
                });
            }
            directive.slideToggle = slideToggle;
            function convertToNumber() {
                return {
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModel) {
                        ngModel.$parsers.push(function (val) {
                            return parseInt(val, 10);
                        });
                        ngModel.$formatters.push(function (val) {
                            return '' + val;
                        });
                    }
                };
            }
            directive.convertToNumber = convertToNumber;
        })(directive = component.directive || (component.directive = {}));
    })(component = source.component || (source.component = {}));
})(source || (source = {}));
var source;
(function (source) {
    var source_libraries;
    (function (source_libraries) {
        var directiveutil;
        (function (directiveutil) {
            function commonDirective(opts) {
                var directive = {
                    restrict: 'A',
                    scope: {},
                };
                if ('templateUrl' in opts) {
                    if (typeof opts.templateUrl === 'function') {
                        directive.templateUrl = opts.templateUrl;
                    }
                    else {
                        directive.templateUrl = '/partial/' + opts.templateUrl;
                    }
                }
                else if ('template' in opts) {
                    directive.template = opts.template;
                }
                if ('controller' in opts) {
                    directive.controller = opts.controller;
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
            directiveutil.commonDirective = commonDirective;
            function renderTemplate(templateUrl, controller, link) {
                var opts = {
                    templateUrl: templateUrl,
                    controller: controller,
                };
                if (link !== undefined) {
                    opts.link = link;
                }
                return commonDirective(opts);
            }
            directiveutil.renderTemplate = renderTemplate;
            function renderTemplateNotUrl(template, controller, link) {
                var opts = {
                    template: template,
                    controller: controller,
                    replace: true
                };
                if (link !== undefined) {
                    opts.link = link;
                }
                return commonDirective(opts);
            }
            directiveutil.renderTemplateNotUrl = renderTemplateNotUrl;
            function renderTemplateWithPromiseSuccess(templateUrl, controller, promise, callback) {
                return commonDirective({
                    templateUrl: templateUrl,
                    controller: controller,
                    link: function ($scope, element, attributes, controller) {
                        promise(controller)
                            .then(function (response) {
                            callback($scope, element, controller, response);
                        }, function (response) {
                            console.log("renderTemplateWithPromiseSuccess: requested failed ");
                            console.log(response);
                        });
                    }
                });
            }
            directiveutil.renderTemplateWithPromiseSuccess = renderTemplateWithPromiseSuccess;
        })(directiveutil = source_libraries.directiveutil || (source_libraries.directiveutil = {}));
    })(source_libraries = source.source_libraries || (source.source_libraries = {}));
})(source || (source = {}));
var Source;
(function (Source) {
    var SourceLibraries;
    (function (SourceLibraries) {
        var Const;
        (function (Const) {
            (function (APIErrorCode) {
                APIErrorCode[APIErrorCode["likeOverLimit"] = 7001] = "likeOverLimit";
                APIErrorCode[APIErrorCode["AuthNotAcceptPermissionEMail"] = 3021] = "AuthNotAcceptPermissionEMail";
                APIErrorCode[APIErrorCode["AuthNotAcceptPermissionBirthday"] = 3023] = "AuthNotAcceptPermissionBirthday";
                APIErrorCode[APIErrorCode["AuthNotAcceptPermissionFriends"] = 3024] = "AuthNotAcceptPermissionFriends";
                APIErrorCode[APIErrorCode["AuthNotAcceptPermissionRelationships"] = 3025] = "AuthNotAcceptPermissionRelationships";
                APIErrorCode[APIErrorCode["PhotoRequestCannotForBlockedPartner"] = 19004] = "PhotoRequestCannotForBlockedPartner";
            })(Const.APIErrorCode || (Const.APIErrorCode = {}));
            var APIErrorCode = Const.APIErrorCode;
            function authNotAcceptErrorCode(code) {
                switch (code) {
                    case 3017:
                    case 3018:
                    case 3019:
                    case 3020:
                    case 3022:
                        return true;
                }
                return false;
            }
            Const.authNotAcceptErrorCode = authNotAcceptErrorCode;
        })(Const = SourceLibraries.Const || (SourceLibraries.Const = {}));
    })(SourceLibraries = Source.SourceLibraries || (Source.SourceLibraries = {}));
})(Source || (Source = {}));
var source;
(function (source) {
    var component;
    (function (component) {
        'use strict';
        angular.module('source.component', [
            'source.hideblock',
            'source.libraries.cookie',
            'source.libraries.cache',
            'source.libraries.http',
            'source.source_libraries.services',
            'source.personalview',
        ])
            .service('APIService', ['HttpService', '$q', 'SourceCookie', source.api.APIService])
            .service('APICallService', ['HttpService', '$q', 'SourceCookie', '$state', 'SourceCache', source.api.APICallService])
            .directive('customSelect', ['$timeout', source.component.directive.customSelect])
            .directive('perfectScrollbar', [source.component.directive.perfectScrollbar])
            .directive('slideToggle', [source.component.directive.slideToggle])
            .directive('convertToNumber', [source.component.directive.convertToNumber]);
    })(component = source.component || (source.component = {}));
})(source || (source = {}));
var source;
(function (source) {
    var loader;
    (function (loader) {
        var controller;
        (function (controller) {
            'use strict';
            var LoaderController = (function () {
                function LoaderController($http, $timeout, $interval, UiService) {
                    this.$http = $http;
                    this.$timeout = $timeout;
                    this.$interval = $interval;
                    this.UiService = UiService;
                    this.http = $http;
                    this.timeout = $timeout;
                    this.interval = $interval;
                    this.uiService = UiService;
                }
                LoaderController.$inject = [
                    '$http',
                    '$timeout',
                    '$interval',
                    'UiService',
                ];
                return LoaderController;
            })();
            controller.LoaderController = LoaderController;
        })(controller = loader.controller || (loader.controller = {}));
    })(loader = source.loader || (source.loader = {}));
})(source || (source = {}));
var source;
(function (source) {
    var loader;
    (function (loader) {
        var directive;
        (function (directive) {
            function loaderView($rootScope) {
                return source.source_libraries.directiveutil.renderTemplate('common/loader/loader', source.loader.controller.LoaderController, function (scope, loaderView, attributes, controller) {
                    var forceLoading = false;
                    $rootScope.$on('do_force_loading_begin', function () {
                        forceLoading = true;
                    });
                    $rootScope.$on('do_force_loading_finish', function () {
                        forceLoading = false;
                    });
                    var timer;
                    var rotationBegin = function () {
                        var count = 0;
                        function rotate() {
                            var elem5 = document.getElementById('ballLoading');
                            if (elem5 == null) {
                                return;
                            }
                            elem5.style.MozTransform = 'rotate(' + count + 'deg)';
                            elem5.style.WebkitTransform = 'rotate(' + count + 'deg)';
                            if (count === 360) {
                                count = 0;
                            }
                            count += 45;
                        }
                        timer = controller.interval(rotate, 100);
                    };
                    var rotationFinish = function () {
                        if (timer) {
                            controller.interval.cancel(timer);
                        }
                    };
                    scope.isLoading = function () {
                        var ignoreLoadingAPIs = [
                            '/1.0/me',
                            '/partial',
                        ];
                        var requests = controller.http.pendingRequests.filter(function (r) {
                            if (r.method != 'GET') {
                                return true;
                            }
                            var matched = ignoreLoadingAPIs.filter(function (api) {
                                var re = new RegExp(api);
                                return !!re.exec(r.url);
                            });
                            return matched.length === 0;
                        });
                        return requests.length > 0 || forceLoading;
                    };
                    scope.$watch(scope.isLoading, function (loadingResult) {
                        console.log('watch', loadingResult);
                        if (loadingResult) {
                            controller.UiService.centeringWindow($("#ajax_loading_inner > *"), 50, 50);
                            rotationBegin();
                            $(loaderView).show();
                            $("#ajax_loading_inner > *").show(50);
                            $("#ajax_loading_inner").show(50);
                        }
                        else {
                            controller.timeout(function () {
                                $("#ajax_loading_inner > *").hide(50);
                                $("#ajax_loading_inner").hide(50);
                                rotationFinish();
                                $(loaderView).hide();
                            }, 100);
                            scope.$root.$emit('doneLoading');
                        }
                    });
                });
            }
            directive.loaderView = loaderView;
        })(directive = loader.directive || (loader.directive = {}));
    })(loader = source.loader || (source.loader = {}));
})(source || (source = {}));
var source;
(function (source) {
    var loader;
    (function (loader) {
        'use strict';
        angular.module('source.loader', [
            'source.hideblock',
            'source.libraries.ui',
            'source.personalview',
        ])
            .controller(loader.controller)
            .directive('loaderView', ['$rootScope', source.loader.directive.loaderView]);
    })(loader = source.loader || (source.loader = {}));
})(source || (source = {}));
var source;
(function (source) {
    var main;
    (function (main) {
        angular.module('source.main', [
            'ui.router',
            'angulartics',
            'angulartics.google.analytics',
            'angulartics.flurry',
            'source.loader',
            'source.libraries.filters',
            'source.libraries.http',
            'source.libraries.pager',
            'source.libraries.external',
            'source.libraries.ui',
            'source.source_libraries.services',
        ])
            .factory('$exceptionHandler', ['$window', function ($window) {
                return function (exception) {
                    console.log(exception);
                    if (exception.stack) {
                        console.log(exception.stack);
                    }
                    if (SOURCE.global.alreadyErrorTraced) {
                        return;
                    }
                    if (!$window.Raven) {
                        return;
                    }
                    SOURCE.global.alreadyErrorTraced = true;
                    var userContext = {};
                    userContext['html_source_token'] = SOURCE.config.SOURCE_TOKEN;
                    userContext['user_id'] = SOURCE.global.userID;
                    Raven.setUserContext(userContext);
                    Raven.captureException(exception);
                };
            }])
            .config(['$stateProvider', '$urlRouterProvider', '$locationProvider'])
            .run([
            '$state',
            '$stateParams',
            '$location',
            '$timeout',
            'SourceCookie',
            'EnvironmentService',
            'MeService',
            'APICallService',
            'UiService',
            '$cacheFactory',
        ]);
    })(main = source.main || (source.main = {}));
})(source || (source = {}));


//# sourceMappingURL=app.js.map