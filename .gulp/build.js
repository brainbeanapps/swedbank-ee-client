const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function(cb) {
    runSequence(
        'clean',
        'compile',
        cb
    );
});
