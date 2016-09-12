var site = require('./site.json');

(function() {
  var gulp           = require('gulp'),
      plugins        = require('gulp-load-plugins')(),
      del            = require('del'),
      fs             = require('fs'),
      mainBowerFiles = require('main-bower-files'),
      os             = require('os'),
      path           = require('path'),
      through        = require('through2');

  var settings = {
    url: 'http://spilledmilk.github.io',
    src: path.join('dist', '/**/*'),
    ghPages: {
      cacheDir: path.join(os.tmpdir(), 'spilledmilk-site'),
      branch: "gh-pages"
    }
  };

  //---- PROJECT DETAILS ----//
//  gulp.task('projectDetails', function() {
//  });

  //---- RESUME ----//
  gulp.task('resume', function() {
    return gulp.src('src/resume/*.html')
               .pipe(gulp.dest('dist/resume'));
  });

  //---- PAGES ----//
  gulp.task('pages', function() {
    return gulp.src('src/pages/*.pug')
               .pipe(plugins.data({site: site}))
               .pipe(plugins.pug())
               .pipe(gulp.dest('dist'));
  });

  //---- IMAGES ----//
  gulp.task('images', function() {
    return gulp.src('src/img/**/*')
               .pipe(plugins.imagemin())
               .pipe(gulp.dest('dist/img'));
  });

  //---- FONTS ----//
  gulp.task('fonts', function() {
    return gulp.src(['src/fonts/**/*', 'bower_components/font-awesome/fonts/**.*'])
               .pipe(gulp.dest('dist/fonts'));
  });

  //---- CSS ----//
  gulp.task('css', function() {
    return gulp.src('src/sass/**/*.scss')
              .pipe(plugins.sourcemaps.init())
              .pipe(plugins.sass({outputStyle: 'compressed'}))
              .pipe(plugins.concat('app.min.css'))
              .pipe(plugins.sourcemaps.write())
              .pipe(gulp.dest('dist/css'));
  });

  //---- JS ----//
  gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
               .pipe(plugins.sourcemaps.init())
               .pipe(plugins.uglify())
               .pipe(plugins.concat('app.min.js'))
               .pipe(plugins.sourcemaps.write())
               .pipe(gulp.dest('dist/js'));
  });

  //---- BOWER ----//
  gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
               .pipe(gulp.dest('dist/lib'));
  });

  //---- ASSETS ----//
  gulp.task('assets', ['images', 'fonts', 'css', 'js', 'bower']);

  //---- CONTENT ----//
  gulp.task('content', ['resume']);

  //---- CLEAN ----//
  gulp.task('clean', function(cb) {
    return del(['dist'], cb);
  });

  //---- SERVE ----//
  gulp.task('serve', function() {
    return gulp.src('dist/')
               .pipe(plugins.webserver({
                 port: 8080,
                 path: '/',
                 host: 'localhost',
                 livereload: true,
                 directoryListing: false
               }));
  });

  //---- DEPLOY ----//
  gulp.task('deploy', function() {
    return gulp.src('dist/**/*')
               .pipe(plugins.ghPages(settings.ghPages));
  });

  //---- WATCH ----//
  gulp.task('watch', function() {
    gulp.watch('src/img/**/*', ['assets']);
    gulp.watch('src/fonts/**/*', ['assets']);
    gulp.watch('src/sass/**/*', ['assets']);
    gulp.watch('src/js/**/*', ['assets']);
    gulp.watch('bower_components/**', ['assets']);
    gulp.watch('src/**/*', ['pages']);
  });

  //---- DEFAULT ----//
  gulp.task('default', plugins.sequence('clean', 'assets', 'content', 'pages', ['serve', 'watch']));

}());
