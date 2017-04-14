'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var miniHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('scss/mathsjokemachine.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', function() {
    return gulp.src('mathsjokemachine.html')
        .pipe(miniHTML())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(concat('mathsjokemachine.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('mathsjokemachine.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['sass'])

gulp.task('watch', function() {
    gulp.watch('scss/mathsjokemachine.scss',['sass']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('mathsjokemachine.html',['html']);
})