const {src, dest, series, watch} = require('gulp');
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const miniCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function html() {
  return src('./src/*.html').pipe(dest('./dest'));
}

function css() {
  return src('./src/css/**/*.css')
    .pipe(prefix({
        cascade: false
    }))
    .pipe(miniCSS())
    .pipe(dest('./dest/css/'));
}

function js() {
  return src(['./src/js/resources.js', './src/js/app.js', './src/js/engine.js'])
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(concat('main.js'))
//   .pipe(uglify())
  .pipe(dest('./dest/js/'));
}

function imagePng() {
  return src('./src/images/*.png')
    .pipe(imagemin())
    .pipe(dest('./dest/images'));
}
//[imagemin.optipng({optimizationLevel: 5})]
function imageJpg() {
    return src('./src/images/*.jpg')
      .pipe(imagemin())
      .pipe(dest('./dest/images'));
  }
//[imagemin.jpegtran({progressive: true})]
function sync() {
  watch('./src/*.html').on('change', series(html, browserSync.reload));
  watch('./src/css/**/*.scss').on('change', series(css, browserSync.reload));
  watch('./src/js/*.js').on('change', series(js, browserSync.reload));
  watch('./src/images/*.jpg').on('change', series(image, browserSync.reload));
}

exports.all = series(html, css, js, imagePng, imageJpg);
exports.css = css;
exports.imagePng = imagePng;
exports.imageJpg = imageJpg;
exports.html = html;
exports.js = js;