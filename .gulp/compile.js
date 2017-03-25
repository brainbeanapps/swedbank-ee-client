const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('compile', function(cb) {
    runSequence(
        'compile:es6',
        'compile:es5',
        cb
    );
});
