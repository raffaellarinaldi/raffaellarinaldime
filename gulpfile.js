const
{ series } = require('gulp'),
gulp = require('gulp'),
rename = require('gulp-rename'),
pipeline = require('readable-stream').pipeline

function copyAssets(cb) {
  gulp.src(['./node_modules/bootstrap/scss/**'])
  .pipe(gulp.dest('./src/assets/css/vendor/bootstrap'))
  gulp.src([
    './node_modules/flickity/dist/flickity.min.css',
    './node_modules/simplelightbox/dist/simple-lightbox.min.css',
    './node_modules/@highlightjs/cdn-assets/styles/atom-one-dark.min.css'
  ])
  .pipe(gulp.dest('./src/static/assets/css'))
  gulp.src('./node_modules/@fortawesome/fontawesome-free/js/all.min.js')
  .pipe(rename('fontawesome.min.js'))
  .pipe(gulp.dest('./src/static/assets/js'))
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.min.js',
    './node_modules/flickity/dist/flickity.pkgd.min.js',
    './node_modules/simplelightbox/dist/simple-lightbox.min.js',
    './node_modules/@highlightjs/cdn-assets/highlight.min.js',
    './node_modules/imagesloaded/imagesloaded.pkgd.min.js',
    './node_modules/isotope-layout/dist/isotope.pkgd.min.js'
  ])
  .pipe(gulp.dest('./src/static/assets/js'))
  console.log('Ok!')
  cb()
}

exports.default = series(copyAssets)
