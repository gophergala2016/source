/* jshint node:true */
'use strict';
// generated on 2014-11-27 using generator-revel 0.0.0

global.app_port = 19000;
global.app_name = 'github.com/gophergala2016/source';
global.GOPATH = process.env.GOPATH ? process.env.GOPATH.split(':')[0] : '';

global.gulp = require('gulp');
global.util = require('gulp-util');
global.mainBowerFiles = require('main-bower-files');
global.$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'del']
});
global.browserSync = require('browser-sync');
global.notifier = require('node-notifier');
global.gulpTaskList = require('gulp-task-list')(global.gulp)

global.chalk = {};
(function(){
  var _chalk  = require('chalk');
  for(var k in _chalk.styles){
    (function(key){
      chalk[key] = function(str){
        util.log(_chalk[key](str));
      };
    })(k);
  }
})();
global.isRelease = util.env.release;
global.environment = util.env.env;
global.lang = util.env.lang;
global.command = util.env.command;
global._name = util.env.name;
global._path = util.env.path;
global._file = util.env.file;
global.buildDir = util.env.output || GOPATH+"/bin/source";


require('events').EventEmitter.prototype._maxListeners = 30;

require('require-dir')('./misc/gulp');


/*
var assets_dir = 'assets/',
    cache_dir = assets_dir+'cache/',
    ts_dir = assets_dir+'typescripts/',
    sass_dir = assets_dir+'stylesheets/',
    vendor_dir = 'public/vendor';
*/
