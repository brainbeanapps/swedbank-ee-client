const gulp = require('gulp');
const util = require('gulp-util');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('compile:ts', function () {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp.src(tsProject.config.include, {base: '.'})
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(tsProject.options.outDir));
});
