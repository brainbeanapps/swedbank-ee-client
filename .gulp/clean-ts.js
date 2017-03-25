const gulp = require('gulp');
const del = require('del');
const util = require('gulp-util');

gulp.task('clean:ts', function () {
    return del([
        'obj/**/*.js',
        'obj/**/*.js.map'
    ]).then(function (paths) {
        if (paths.length <= 0)
            return;
        util.log('Deleted:', '\n' + util.colors.magenta(paths.join('\n')));
    });
});
