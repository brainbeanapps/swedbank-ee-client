const gulp = require('gulp');
const del = require('del');
const util = require('gulp-util');

gulp.task('clean:es5', function () {
    return del([
        'dist.es5/**/*.js',
        'dist.es5/**/*.js.map'
    ]).then(function (paths) {
        if (paths.length <= 0)
            return;
        util.log('Deleted:', '\n' + util.colors.magenta(paths.join('\n')));
    });
});
