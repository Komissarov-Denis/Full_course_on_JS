/* eslint-disable linebreak-style */

// const gulp = require('gulp');
// const browserSync = require('browser-sync');
// const jsonServer = require('gulp-json-srv');
// const sass = require('gulp-sass')(require('sass'));
// const rename = require('gulp-rename');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');
// const del = require('del'); 

import gulp from 'gulp';
import browserSync from 'browser-sync'; // синхронизатор браузера
import jsonServer from 'gulp-json-srv'; // сервер JSON ????
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer'; // подставляет автопрефиксы для различных браузеров
import cleanCSS from 'gulp-clean-css'; // оптимизатор пробелов и пустых мест
import htmlmin from 'gulp-htmlmin'; // оптимизатор html
import imagemin from 'gulp-imagemin'; // оптимизатор картинок
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

const gulpJsonServer = jsonServer.create({ //запускаем gulp-json-srv сервер с портом 25000 
	port: 25000,
});
gulp.task('jsonServerStart', function(){
	return gulp.src('src/db.json')
		.pipe(gulpJsonServer.pipe());
}); // запускаем gulp-json-srv сервер  ????

// gulp.watch(['db.json'], function(){
// 	gulpJsonServer.reload();
// }); // добавляем вотчер для сервера gulp-json-srv ?????


// Static server запускается функция сервер из указанной папки src
gulp.task('server', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch('src/*.html').on('change', browserSync.reload); // обновляет страницу при изменениях
});

//новая задача стайлс берет данные и возвращает по выпонению скомпилированные файлы sass/scss во всех папках src/css, так же синхронизирует браузер как лайв-сервер
//outputStyle - итоговый стиль compressed - сжатый, on('error', sass.logError)) - подскажет об ошибке  и ему добавиться суффикс ".мин" + автопрефиксы добавляются, после префиксов файл очищается
gulp.task('styles', function() {
	return gulp.src('src/sass/**/*.+(scss|sass)') // используем компиляцию для всех папок и файлов внутри папки sass и scss, и sass
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // запускает компилятор сжатия и подсказывает, если есть ошибка
		.pipe(rename({suffix: '.min', prefix: ''})) // переименовщик в style.min.css
		.pipe(autoprefixer()) // подставляем автопрефиксы в style.min.css для последних версий браузеров, настройки берет из package.json
		.pipe(cleanCSS({compatibility: 'ie8'})) // после автопрефиксов style.min.css будет очищаться
		.pipe(gulp.dest('dist/css')) // определяем папку назначаения
		.pipe(browserSync.stream()); // перезапускает browserSync в потоке
});

//задача на отслеживание изменений в коде src/sass по факту изменений запускается стайлс и обновляет  browserSync - наш браузер
//так же отслеживает изменения в html файлах по каждому обновлению браузера
gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/*.html').on('change', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
	gulp.watch('src/*.php').on('change', gulp.parallel('php'));
	gulp.watch('src/*.json').on('change', gulp.parallel('json'));
	gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
	gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
	gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

gulp.task('php', function() {
	return gulp.src('src/*.php')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('json', function() {
	return gulp.src('src/*.json')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*') 
		.pipe(gulp.dest('dist/fonts'))
		.pipe(browserSync.stream());
});

gulp.task('icons', function() {
	return gulp.src('src/icons/**/*') 
		.pipe(gulp.dest('dist/icons'))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
});

gulp.task('mailer', function() {
	return gulp.src('src/mailer/**/*') 
		.pipe(gulp.dest('dist/mailer'))
		.pipe(browserSync.stream());
});

// задача, запускающая параллельно сервер, и стайлс, и вотч
gulp.task('default', gulp.parallel('watch', 'server', 'jsonServerStart','styles', 'html', 'scripts', 'php', 'json','fonts', 'icons', 'images', 'mailer'));
