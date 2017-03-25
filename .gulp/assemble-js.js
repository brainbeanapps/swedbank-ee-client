const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('assemble:js', function () {
    gulp.src('obj/**/*.js', {base: 'obj'})
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('bin'));
});
