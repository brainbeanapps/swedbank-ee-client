const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('compile:es5', function () {
    gulp.src('dist.es6/**/*.js', {base: 'dist.es6'})
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist.es5'));
});
