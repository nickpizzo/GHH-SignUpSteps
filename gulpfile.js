///////////////////
// REQUIRED MODULES
///////////////////

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var ghPages = require('gh-pages');

///////////////////////////
// HTML CSS & SCRIPTS TASKS
///////////////////////////

const sync = browserSync.create();

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('scripts', () => {
  gulp.src('src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

gulp.task('styles', function () {
  gulp.src('src/*.{css,scss,less,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(prefix('last 2 versions')) //calls autoprefixer
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
    stream: true
  }));
});

gulp.task('images', () => {
  gulp.src('src/**/*.{png,jpg,svg}')
    .pipe(gulp.dest('dist'))
    .pipe(sync.reload({
      stream: true
    }));
});

////////////////////////////////////////////////////
//PIPES SRC FILES INTO DIST & WATCHES CHANGES IN SRC
///////////////////////////////////////////////////

gulp.task('build', ['html', 'scripts', 'styles', 'images']);

gulp.task('serve', ['build'], function () {
  sync.init({
    server: 'dist',
  });

  gulp.watch('src/*.{html,jade}', ['html']);
  gulp.watch('src/*.js', ['scripts']);
  gulp.watch('src/*.{css,scss,sass}', ['styles']);
  gulp.watch('src/**/*.{png,jpg,svg}', ['images']);
});

////////////////////
//DEPLOY TO GH PAGES
////////////////////

gulp.task('deploy', ['build'], function () {
  ghPages.publish('dist');
});

//////////////////////////////
// THE DEFAULT TASK IS "SERVE"
//////////////////////////////

gulp.task('default', ['serve']);
