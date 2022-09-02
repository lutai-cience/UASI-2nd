const { src, dest, parallel, series, watch } = require('gulp');
var gulpif = require('gulp-if');

const env = process.env.NODE_ENV || 'development';
const is_offline = process.env.IS_OFFLINE || false;


const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;

function browsersync() {
	browserSync.init({
		server: { baseDir: 'source/' },
		online: !is_offline // change to false if you don't have the internet connection
	})
}

function scripts() {
	return src([
    'source/js/inc/*.js',
		'source/js/main.js',
    ])
  .pipe(gulpif(env == 'development', sourcemaps.init()))
  .pipe(babel({ presets: ['@babel/env'] }))
	.pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulpif(env == 'development', sourcemaps.write('.')))
	.pipe(dest('source/js/'))
	.pipe(browserSync.stream())
}

function styles() {
  return src('source/scss/main.scss')
  .pipe(gulpif(env == 'development', sourcemaps.init()))
	.pipe(sass())
  .pipe(concat('main.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 8 versions'] }))
  .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
  .pipe(gulpif(env == 'development', sourcemaps.write('.')))
	.pipe(dest('source/css/'))
	.pipe(browserSync.stream())
}

function images() {
	return src('source/img/src/**/*.{gif,jpg,jpeg,ico,png,svg}') 
	.pipe(newer('source/img/'))
	.pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 85, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
						{removeViewBox: false},
						{convertPathData: false}
        ]
      })
    ]))
	.pipe(dest('source/img/'))
}

function cleanimg() {
	return del('source/img/*.*', { force: true })
}

function cleandist() {
	return del('dist/**/*', { force: true })
}


var header = require('gulp-header');
var footer = require('gulp-footer');

function addStyle() {
	return src('dist/css/main.min.css')
	  .pipe(header('<style>'))
	  .pipe(footer('</style>'))
	  .pipe(dest('unbounce'));
  }
  
  function addScript() {
	  return src('dist/js/main.min.js')
		.pipe(header('<script>'))
		.pipe(footer('</script>'))
		.pipe(dest('unbounce'));
	}


function buildcopy() {
	return src([ 
		'source/css/**/*.min.css',
		'source/js/**/*.min.js',
		'source/img/*.{gif,jpg,jpeg,ico,png,svg}',
		'source/**/*.html',
		], { base: 'source' })
	.pipe(dest('dist'))
}

function startwatch() {
 
	watch(['source/js/main.js'], scripts);
	watch(['source/scss/settings.scss', 'source/scss/main.scss', '!source/source.scss'], styles);
	watch('source/**/*.html').on('change', browserSync.reload);
	watch('source/img/src/**/*.{gif,jpg,jpeg,ico,png,svg}', images);
 
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;

exports.build = series(cleandist, styles, scripts, images, buildcopy, addStyle, addScript);

exports.default = parallel(styles, scripts, images, browsersync, startwatch);
