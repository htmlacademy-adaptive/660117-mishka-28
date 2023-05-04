import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import libsquoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import terser from 'gulp-terser';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//HTML

export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

//Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

//Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(libsquoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}

//Webp

const webp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(libsquoosh(
    {webp: {}}
  ))
  .pipe(gulp.dest('build/img'));
}

//SVG

const optimizeSvg = () => {
  return gulp.src('source/img/svg/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img/svg'));
}

const sprite = () => {
  return gulp.src('source/img/svg/inline-svg/*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build'));
}

//Copy

const copy = (done) => {
  gulp.src([
  'source/fonts/*.{woff,woff2}',
  'source/*.ico',
  'source/*.webmanifest'
],{
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

//Clean

const clean = () => {
  return deleteAsync('build');
  };

// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html));
  gulp.watch('source/*.html').on('change', browser.reload);
}

//Build

export const build = gulp.series (
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    sprite,
    webp
  ),
)

//Start

export const start = gulp.series (
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    optimizeSvg,
    sprite,
    webp
  ),gulp.series (
    server,
    watcher
  )
)

