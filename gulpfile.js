const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');

function sass2css() {
    return src('./public/src/sass/app.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('./public/dist/css/'))
        .pipe(browserSync.stream());
}

function doBrowserSync() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}
function linter() {
    return src(['./*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());


}

function optimizeImages() {
    return src('./src/images/*.*')
        .pipe(imagemin())
        .pipe(dest('./dist/images/'));
}

watch("./public/src/sass/**/*.scss", parallel(sass2css));

module.exports.images = optimizeImages;
module.exports.linter = linter;
module.exports.default = parallel(sass2css, doBrowserSync);