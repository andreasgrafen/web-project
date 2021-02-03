const {task, src, dest, parallel, series, watch} = require('gulp')


// general
const config = require('./gulpconfig.js')
const rename = require('gulp-rename')

// html
const pug    = require('gulp-pug')

// css
const sass   = require('gulp-sass')
const prefix = require('gulp-autoprefixer')

// js
const babel  = require('gulp-babel')
const minify = require('gulp-minify')





task('configText', () => {
  return src(config.config.text.src)
  .pipe(dest(config.config.text.dest))
})

task('configHidden', () => {
  return src(config.config.hidden.src)
  .pipe(rename({
    prefix: '.',
    extname: ''
  }))
  .pipe(dest(config.config.hidden.dest))
})

task('config', parallel('configText', 'configHidden'))



task('pug', () => {
  return src(config.pug.src)
  .pipe(pug(config.pug.opts.pug))
  .pipe(dest(config.pug.dest))
})



task('sass', () => {
  return src(config.sass.src)
  .pipe(sass(config.sass.opts.sass).on('error', sass.logError))
  .pipe(prefix(config.sass.opts.autoprefixer))
  .pipe(rename({extname: config.sass.ext}))
  .pipe(dest(config.sass.dest))
})



task('js', () => {
  return src(config.js.src)
  .pipe(babel(config.js.opts.babel))
  .pipe(minify({ext: {min: config.js.ext}}))
  .pipe(dest(config.js.dest))
})



task('images', () => {
  return src(config.images.src)
  .pipe(dest(config.images.dest))
})



task('fonts', () => {
  return src(config.fonts.src)
  .pipe(dest(config.fonts.dest))
})





task('default', parallel(
  'config',
  'pug',
  'sass',
  'js',
  'images',
  'fonts'
))



task('watchPug', () => { watch(`${config.watchSource}/pug/**/*`, series('pug')) })
task('watchSass', () => { watch(`${config.watchSource}/scss/**/*`, series('sass')) })
task('watchJS', () => { watch(`${config.watchSource}/js/**/*`, series('js')) })


task('watch', parallel(
  'watchPug',
  'watchSass',
  'watchJS'
))
