gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var notifier = require('node-notifier');
var nodemon = require('gulp-nodemon');
var cachebust = require('gulp-cache-bust');
var production = (gutil.env.env == "production");

var onError = function (err) {
    notify.onError({ title: "Gulp", subtitle: "Failure!", message: "Error: <%= error.message %>", sound: "Beep" })(err);

    this.emit('end');
};
gulp.task('browserify-vendor', function () {
    return gulp
        .src(['public/js/vendor/*.js', 'public/js/**/*'])
        .pipe(concat('vendor.min.js'))
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(gulp.dest('build/resources/js'));
});

gulp.task('browserify-app', function () {
    return browserify({ entries: 'app/main.jsx', debug: false, fullPaths: true })
        .transform(babelify, {
            presets: ['es2015', 'react', 'stage-2']
        })
        .bundle()
        .on('error', onError)
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(gulpif(!production, sourcemaps.write()))
        .pipe(gulp.dest('build/resources/js'));
});

gulp.task('watch', [
    'browserify-vendor', 'browserify-app'
], function () {
    var bundler = watchify(browserify({
        entries: 'app/main.jsx',
        debug: true,
        fullPaths: true
    }, watchify.args));
    bundler.transform(babelify, {
        presets: ['es2015', 'react', 'stage-2']
    });
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler
            .bundle()
            .on('error', onError)
            .on('end', function () {
                gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
                notifier.notify({ title: 'Build successful', message: 'Done' });
            })
            .pipe(source('app.min.js'))
            .pipe(buffer())
            .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(production, uglify({ mangle: false })))
            .pipe(gulpif(!production, sourcemaps.write()))
            .pipe(gulp.dest('build/resources/js/'));
    }
});

gulp.task('styles', function () {
    sass('public/sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('build/resources/css'));
    notifier.notify({ title: 'CSS Build Successful', message: 'Done' });
});

gulp.task('styles:watch', function () {
    gulp.watch('public/sass/**/*.scss', ['styles']);
})

gulp.task('copy-static', function () {
    gulp
        .src('public/fonts/*')
        .pipe(gulp.dest('build/resources/fonts'));

    gulp
        .src('public/css/*')
        .pipe(gulp.dest('build/resources/css'));
    gulp
        .src('views/index.html')
        .pipe(gulp.dest('build'));

});

gulp.task('imagemin', function () {
    gulp
        .src('public/images/*')
        .pipe(gulpif(production, imagemin()))
        .pipe(gulp.dest('build/resources/images'));
});

gulp.task('develop', function () {
    var stream = nodemon({ script: './index.js', ext: 'js', ignore: 'build/' });

    stream.on('restart', function () {
        console.log('restarted!');
    })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 2); // restart the server in 10 seconds;
        })
});

gulp.task('bust', function () {
    gulp
        .src('build/index.html')
        .pipe(cachebust())
        .pipe(gulp.dest('build'));
    notifier.notify({ title: 'Build Successful', message: 'Done' });
});

gulp.task('build', ['browserify-vendor', 'copy-static', 'imagemin', 'browserify-app', 'styles'], function () {
    gulp.start('bust');
});
gulp.task('api', ['develop']);
gulp.task('default', ['copy-static', 'imagemin', 'develop', 'watch', 'styles', 'styles:watch']);
gulp.task('deploy', function () {
    gulp.src([
        'build/**/*',
        'api/**/*',
        'mock/**/*',
        './index.js',
        './package.json'
    ], { base: '.' })
        .pipe(gulp.dest('../Build/numerix'));

});
gulp.watch([
    'views/index.html', 'public/fonts/*'
], ['copy-static']);
gulp.watch('public/js/**/*', ['browserify-vendor']);