const gulp = require('gulp');

gulp.task('compile', [
    'compile:ts'
]);
gulp.task('compile:watch', [
    'compile:ts:watch'
]);
