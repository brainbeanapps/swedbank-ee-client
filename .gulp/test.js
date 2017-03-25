const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('test', function(cb) {
    runSequence(
        'test:run',
        cb
    );
});
