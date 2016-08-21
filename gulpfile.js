var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var del = require('del');
var runSequence = require('run-sequence');
var babelify = require('babelify');

const spawn = require('child_process').spawn;

var path = {
    HTML: './assets/index.html',
    MINIFIED_OUT: 'main.min.js',
    MINIFIED_VENDOR: 'vendor.min.js',
    OUT: 'index.js',
    DEST: './out',
    DEST_BUILD: './out/public',
    DEST_SRC: './out/src',
    ENTRY_POINT: './assets/javascript/main.js',
    MAINJS: './main.js',
    PACKAGEJSON: './package.json',
   COVERAGE: './coverage'
};

var dependencies = [
  'react',
  'react-dom',
];

gulp.task("test", function() {
    spawn('npm', ['test'], {stdio: 'inherit'})
});

gulp.task('copy-index-html', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('copy-main-js', function(){
    gulp.src(path.MAINJS)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('copy-package-json', function(){
    gulp.src(path.PACKAGEJSON)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('clean', function(){
    del.sync(path.DEST);
    del.sync(path.COVERAGE);
});

gulp.task('build-main-js', function(){
    browserify({
        entries: [path.ENTRY_POINT],
    }).transform(babelify, {presets: ['es2015', 'react']}) // Babel transforms
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build-vendor-js', function(){
    browserify()
        .require(dependencies)
        .bundle()
        .pipe(source(path.MINIFIED_VENDOR))
        .pipe(streamify(uglify(path.MINIFIED_VENDOR)))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('copy-assets', [
    'copy-index-html',
    'build-main-js',
    'build-vendor-js',
    'copy-main-js',
    'copy-package-json'

]);

gulp.task('build', function(cb) {
    runSequence('clean','copy-assets',function(){
        cb();
    })
})

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));

});
gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);
