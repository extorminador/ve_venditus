'use strict'

var gulp = require('gulp'),
    path = {},
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),

    jadeFiles = [
      './src/jade/layout.jade',
      './src/jade/index.jade',
    ],
    cssFiles = [
      './src/sass/reset.css',
      './src/sass/main.scss',
    ],
//    jsFiles = [
//
//    ],

    minHTML = './dist/index.html',
    minCSS = './dist/css/main.min.css',
    minJS = './dist/js/script.min.js',

//    path.watch = {
//      HTLM = 'dist/*.html',
//      CSS = 'dist/css/*.css',
//    JS = 'dist/js/*.js',
//    };

    pathDist = './',

    locals = {
              title : 'Venditus',
              link : 'http://venditus.se/',
              description : 'description of 156 characters maximum'
    }

// Jade To Html
gulp.task('html', () => {
  return gulp
            .src( jadeFiles )
            .pipe(jade({
                        pretty: true,
                        locals: locals
            }))
            .pipe( concat( minHTML ) )
            .pipe(gulp.dest( pathDist ))
})


// SASS To CSS
gulp.task('css', () => {
  gulp
      .src( cssFiles )
      .pipe( sass() )                       // Sass to CSS
      .pipe( concat( minCSS ) )             // Concat
      .pipe( autoprefixer ({                // Autoprefixer
        browsers: ['last 2 version'],
        cascade: false
      }))
//      .pipe ( minifycss() )                 // Minify-css
      .pipe( gulp.dest( pathDist ) )
})

// Autoprefixer
gulp.task('auto', () => {
  return gulp
            .src( minCSS )
            .pipe( autoprefixer({
              browsers: ['last 2 version'],
              cascade: false
            }))
            .pipe( gulp.dest( './dist/css/' ) )
})

// Server
gulp.task('server', () => {
    connect.server({
      root : './dist',
      port : 3000,
      livereload : true
    })
})

// Reload
gulp.task('reload', () => {
    gulp
        .src(['./dist/**/*.*'])
        .pipe( connect.reload() )
})

// Watch
gulp.task('watch', () => {
  gulp
      .watch(['./dist/**/*.*'], ['reload'])
});

// Watch in CSS and HTML
gulp.task('html5', () => {
  gulp
      .watch(['./src/**/*.*'], ['css', 'html'])
});

// Start
gulp.task('default', ['server', 'watch', 'html5'])

// Default
gulp.task('min', ['css', 'html']);
