const gulp = require('gulp');
const mocha = require('gulp-mocha');

//TODO: https://github.com/SitePen/remap-istanbul#gulp-plugin
gulp.task('test:run', function() {
    gulp.src('test/**/*.ts', {
            read: false
        })
        .pipe(mocha());
});
