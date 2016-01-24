var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    typescript = require('typescript'),
    plumber = require('gulp-plumber'),
    Config = require('./gulpfile.config'),
    config = new Config(),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'main-bower-files', 'del']
    });
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint())
        .pipe(tslint.report('prose'));
});

gulp.task('compile-ts', ['ts-lint'],
    function () {
    var sourceTsFiles = [
            config.allTypeScript,
            config.libraryTypeScriptDefinitions,
            config.appTypeScriptReferences
        ],
        tsResult = gulp.src(sourceTsFiles)
            .pipe(sourcemaps.init())
            .pipe(tsc({
                typescript: typescript,
                module: 'commonjs',
                target: 'ES5',
                emitDecoratorMetadata: true,
                declarationFiles: false,
                noExternalResolve: true,
                experimentalDecorators: true

            }));

    tsResult.dts
        .pipe(gulp.dest('./client/app'));

    return tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./client/app'));
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
    gulp.watch(['assets/stylesheets/pc/**/*.scss'], ['scss:pc']);
    gulp.watch(['assets/stylesheets/sp/**/*.scss'], ['scss:sp']);
});

var routine = function(path) {
  gulp.src(['assets/stylesheets/' + path + '/*.scss'])
    .pipe($.plumber())
    .pipe($.compass({
      config_file : 'assets/stylesheets/config.rb',
      comments : false,
      css : 'assets/cache/css/' + path,
      sass: 'assets/stylesheets/' + path + '/',
      bundle_exec: true
    }))
    .pipe($.csscomb())
    .pipe($.pleeease({
      autoprefixer: {
        browsers: ['last 2 versions', 'ie 9']
      },
      minifier: false // boolean
    }))
    .pipe($.concat(path + '.css'))
    .pipe(gulp.dest('client/css/'));
}

// task for PC compass
gulp.task('scss:pc',function(){
  routine('pc');
});

// task for Smartphone compass
gulp.task('scss:sp',function(){
  routine('sp');
});

gulp.task('build', ['scss:pc', 'scss:sp', 'ts-lint', 'compile-ts']);

gulp.task('js-vendor', function(){
  gulp.src(['assets/vendor/**/*.js'])
    .pipe($.concatVendor('vendor.js'))
    .pipe($.uglify({
      preserveComments: 'some',
    }))
    .pipe(gulp.dest('client/app/'));
});