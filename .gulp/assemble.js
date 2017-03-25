const gulp = require('gulp');

gulp.task('assemble', [
    'assemble:js'
]);
gulp.task('assemble:watch', [
    'assemble:js:watch'
]);
