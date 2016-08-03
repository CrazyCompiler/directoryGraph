var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var del = require("del");
var runSequence = require('run-sequence');

var path = {
    HTML: './assets/index.html',
    MINIFIED_OUT: 'main.min.js',
    OUT: 'index.js',
    DEST: './out',
    DEST_BUILD: './out/public',
    DEST_SRC: './out/src',
    ENTRY_POINT: './assets/javascript/main.js'

};
gulp.task('copy-index', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));

});

gulp.task('clean', function(){
  del.sync(path.DEST);
})

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);
    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true

    }));
    return watcher.on('update', function () {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
        console.log('Updated');

    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));

});
gulp.task('build-assets', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],

    })
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST_BUILD));

});

gulp.task("build", function(cb) {
    runSequence('clean','build-assets','copy-index',function(){
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
