var gulp = require('gulp');
var miniHTML = require('gulp-minify-html');
var gulpscss = require('gulp-scss');
var gulpscsslint = require('gulp-scss-lint');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');

gulp.task('scss', function() {
    return gulp.src('mathsjokemachine.scss')
        .pipe(gulpscsslint())
        .pipe(gulpscss())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['scss'])