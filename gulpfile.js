'use strict'

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    locals = {
              title : 'Venditus',
              link : 'http://venditus.se/',
              description : 'description of 156 characters maximum'
    }


gulp.task('jade', () => {
    return gulp.src('./*.jade')
    .pipe(jade({
        pretty: true,
        locals: locals
    }))
    .pipe(gulp.dest('./'))
})


gulp.task('sass', () => {
  return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
  gulp.watch("./src/sass/*.scss"), ["sass"];
});

gulp.task('default', ['sass', 'jade', 'watch']);
