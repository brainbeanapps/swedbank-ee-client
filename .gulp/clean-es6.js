const gulp = require('gulp');
const del = require('del');
const util = require('gulp-util');

gulp.task('clean:es6', function () {
    return del([
        'dist.es6/**/*.js',
        'dist.es6/**/*.js.map'
    ]).then(function (paths) {
        if (paths.length <= 0)
            return;
        util.log('Deleted:', '\n' + util.colors.magenta(paths.join('\n')));
    });
});
