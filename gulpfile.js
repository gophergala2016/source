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

/* jshint node:true */

gulp.task('serve', ['browser-sync', 'revel:kill', 'typescript',  'js-vendor', 'scss', 'npm'], function () {
  // gulp.start(['watch', 'revel:run']);
  gulp.watch("public/js/*.js", ['bs-reload']);
  gulp.watch("public/css/*.css", ['bs-reload']);
  gulp.watch("public/img/**/*.png", ['bs-reload']);
});

// [watch] js + css
gulp.task('watch', function () {
  gulp.watch(['assets/typescripts/**/*.ts'], ['typescript-pc', 'typescript-sp']);
  gulp.watch(['assets/stylesheets/pc/**/*.scss'], ['scss:pc']);
  gulp.watch(['assets/stylesheets/sp/**/*.scss'], ['scss:sp']);
});


// [build]
gulp.task('html', ['js-vendor', 'typescript', 'scss']);

gulp.task('build', ['html'], function () {
  return gulp.src('public/**/*').pipe($.size({title: 'build', gzip: true}));
});

// update dependent repositories

gulp.task('go-check-all', function(){
  gulp.src('')
    .pipe($.shell([
      "golint ./... | egrep '^app'",
      "go vet ./... | egrep '^app'",
    ]))
    .on('error', function(){
      chalk.red('Go check failed');
    })
    .on('end', function(){
      chalk.cyan('Go check end');
    });
});

gulp.task('go-check', function(){
  gulp.src('')
    .pipe($.shell([
      "git st -s | grep '^ M .*\.go$'|awk '{print $2}'|while read line; do golint $line; done",
      "git st -s | grep '^ M .*\.go$'|awk '{print $2}'|while read line; do go vet $line; done",
    ]))
    .on('error', function(){
      chalk.red('Go check failed');
    })
    .on('end', function(){
      chalk.cyan('Go check end');
    });
});


gulp.task('go:fmt', function(){
  var file = _file || undefined;
  if(typeof file === "undefined"){
    chalk.red("--file Please specify the file name");
    return;
  }

  gulp.src('')
    .pipe($.shell([
      'goimports -w '+file,
      'golint '+file,
      'go vet '+file,
    ]));
});

gulp.task('fmt', function(){
  var file = _file || undefined;
  if(typeof file === "undefined"){
    chalk.red("--file Please specify the file name");
    return;
  }
  var ext = file.split('.').pop();
  switch (ext) {
    case 'go':
      return gulp.start('go:fmt');
    default:
      return chalk.yellow('[.'+ext + ']  no fmt');
  }
});

gulp.task('notify-success', function(){
  createNotify(true);
});

gulp.task('notify-error', function(){
  createNotify(false);
});

var createNotify = function(isSuccess){
  var osx_path = '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/';
  var title = isSuccess ? 'Go test success' : 'Go test failed',
      msg = isSuccess ? 'ginkgo pass' : 'ginkgo failed',
      sound = isSuccess ? 'Hero' : 'Sosumi',
      icon = isSuccess ? 'FavoriteItemsIcon.icns' : 'AlertStopIcon.icns';
  notifier.notify({
    title: title,
    message: msg,
    sound: sound,
    icon : osx_path + "MobileMe.icns",
    contentImage : osx_path + icon,
  });
}

gulp.task('js-vendor', ['js-vendor-pc', 'js-vendor-sp']);

gulp.task('js-vendor-pc', function(){
  gulp.src(['assets/vendor/**/*.js', '!assets/vendor/901_sp_only/**/*.js'])
    .pipe($.concatVendor('vendor.js'))
    .pipe($.if(isRelease, $.uglify({
      preserveComments: 'some',
    }).on('error', util.log)))
    .pipe(gulp.dest('public/js/pc/'));
});

gulp.task('js-vendor-sp', function(){
  gulp.src(['assets/vendor/**/*.js'])
    .pipe($.concatVendor('vendor.js'))
    .pipe($.if(isRelease, $.uglify({
      preserveComments: 'some',
    }).on('error', util.log)))
    .pipe(gulp.dest('public/js/sp/'));
});

gulp.task('npm', function(){
  gulp.src('./package.json')
    .pipe($.install());
});
var tslint = require('gulp-tslint');

gulp.task('tslint',  function(){
  gulp.src('assets/typescripts/**/*.ts')
  .pipe(tslint())
  .pipe(tslint.report('verbose'));
});
/* jshint node:true */

// var beautify = require('gulp-beautify'); // for minify debug -- USAGE: .pipe(beautify())

// task for PC TypeScript
gulp.task('typescript-pc', ['typescript-compile-pc'], function (done) {
  gulp.src(['public/js/pc/app.js'])
    .pipe($.if(isRelease, $.uglify({
      preserveComments: 'some',
    }).on('error', util.log)))

    .pipe($.concatSourcemap('app.js', {
        prefix: 3,
    }))

    .pipe(gulp.dest('public/js/pc/'))
    .on('end', done);
});

gulp.task('typescript-compile-pc', function(done){
  gulp.src(['assets/typescripts/_app.ts'])
    .pipe($.if(!isRelease, $.plumber()))
    .pipe($.typescript({
      typescript: require('typescript'),
      target: "ES5",
      keepTree: false,
      out: 'app.js',
      removeComments: true
    }))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest('public/js/pc/'))
    .on('end',  done);
});

// task for Smartphone TypeScript
gulp.task('typescript-sp', ['typescript-compile-sp'], function (done) {
  gulp.src(['public/js/sp/app.js'])
    .pipe($.if(isRelease, $.uglify({
      preserveComments: 'some',
    }).on('error', util.log)))

    .pipe($.concatSourcemap('app.js', {
        prefix: 3,
    }))

    .pipe(gulp.dest('public/js/sp/'))
    .on('end', done);
});

gulp.task('typescript-compile-sp', function(done){
  gulp.src(['assets/typescripts/_app.ts'])
    .pipe($.if(!isRelease, $.plumber()))
    .pipe($.typescript({
      typescript: require('typescript'),
      target: "ES5",
      keepTree: false,
      out: 'app.js',
      removeComments: true
    }))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest('public/js/sp/'))
    .on('end',  done);
});


// other
gulp.task('typescript', ['typescript-pc', 'typescript-sp']);

// alias
gulp.task('js', ['typescript']);
gulp.task('ts', ['typescript']);

// browser sync
gulp.task('bs-html', function () {
  var opt = {};
  opt.server = { baseDir: "./public/" };
  opt.notify = util.env.notify || true;
  browserSync(opt);
});/* jshint node:true */
var routine = function(path) {
  gulp.src(['assets/stylesheets/' + path + '/*.scss'])
    .pipe($.plumber())
    .pipe($.compass({
      config_file : 'assets/stylesheets/config.rb',
      comments : false,
      css : 'assets/cache/css/' + path,
      sass: 'assets/stylesheets//' + path + '/',
      bundle_exec: true
    }))
    .pipe($.csscomb())
    .pipe($.pleeease({
      autoprefixer: {
        browsers: ['last 2 versions', 'ie 9']
      },
      minifier: isRelease // boolean
    }))
    .pipe($.concat(path + '.css'))
    .pipe(gulp.dest('public/css/'));
}

// task for PC compass
gulp.task('scss:pc',function(){
  routine('pc');
});

// task for Smartphone compass
gulp.task('scss:sp',function(){
  routine('sp');
});

// alias

gulp.task('css', ['scss']);
gulp.task('scss', ['scss:pc', 'scss:sp']);
