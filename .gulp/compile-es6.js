const gulp = require('gulp');
const util = require('gulp-util');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('compile:es6', function () {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp.src([].concat(tsProject.config.files, tsProject.config.include), {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(tsProject.options.outDir));
});
