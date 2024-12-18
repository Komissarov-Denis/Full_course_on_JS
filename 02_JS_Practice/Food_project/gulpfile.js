// webpackConfig----------------------------------------------------------------------------------------------------------------------------------
const webpackConfig =  { // это экспортируемый объект настроек, в котором:
	mode: 'development', // mode - это режим, в котором будет работать webpack (development / production)
	entry: {  // entry point - это файл (точка входа), с которого мы будем начинать разработку
		script: './src/js/script.js', // ./src - точка + слеш - это работа от текущей директории!!!
		// page1: './src/js/pages/page1.js', // это ключ и источник для JS файлов при многостраничном сайте
		// page2: './src/js/pages/page2.js', // это ключ и источник для JS файлов при многостраничном сайте
	},
	output: { // файл (точка) выхода, тут output задаем его только в виде объекта, в котором конфигурируем итоговый файл
		filename: '[name].bundle.js', // это название итогового файла (bundle === пакет), [name] передает ключ из entry ()
		path: '/dist/webpack' // путь, куда мы выложим итоговый скомпилированный файл
	},
	watch: true, // если выставлено true, то webpack будет отслеживать изменение файлов и автоматически собирать проект при каждом сохранении изменений
	devtool: 'source-map', // собранный и оптимизированный проект собирается в один JS файл, он становится нечитаемым, эта технология хранит информацию об исходниках и месте расположения кода
	module: {
		rules: [
			{	// тут настраиваются модули, можно например установить babel как модуль webpack
				test: /\.m?js$/, // выбираем все файлы js с помощью регулярок
				exclude: /(node_modules|bower_components)/, // исключаемые файлы и папки
				use: {
					loader: 'babel-loader', // технология связывающая webpack с babel, но я установил gulp-babel
					options: {
						presets: [['@babel/preset-env', { // используем preset-env
							debug: true, // позволяет видеть ошибки и т.д.
							corejs: 3, // библиотека corejs: 3 для polyfill, необходима библиотека core-js
							useBuiltIns: 'usage', // опция позволяет выбрать только те polyfill, которые нужны, например для обработки метода ForeEach()
						}]]
					}
				}
			},
			// {// этот блок пока не работает!!!
			// 	test: /\.s[ac]ss$/i,
			// 	exclude: /node_modules/,
			// 	type: "asset/resource",
			// 	generator: {
			// 		filename: "[name].bundle.css",
			// 	},
			// 	use: [					
			// 		"style-loader", // Creates `style` nodes from JS strings
			// 		"css-loader", // Translates CSS into CommonJS		
			// 		{
			// 			loader: "sass-loader", // Compiles Sass to CSS	
			// 			options: {
			// 				api: "modern-compiler",
			// 				sassOptions: {// Your sass options
			// 					sourceMap: true,
			// 					sassOptions: {
			// 						outputStyle: "compressed",
			// 					}
			// 				},
			// 				outputPath: '/dist/css',
			// 			},
			// 		},
			// 	],
			// },
		]
	},
	resolve: {
		alias: {
		}
	}, 
	plugins: [
		/* Use the ProvidePlugin constructor to inject jquery implicit globals */
		new webpack.ProvidePlugin({ // использую конструктор ProvidePlugin для внедрения неявных глобальных переменных jquery!!!
			$: 'jquery',
			'window.$': 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		})
	]
};
//------------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------------------------
// GULP - планировщик или менеджер задач, компилятор различных типов плагинов для обработки множества файлов (сжатие, объединение, преобразование), создает и запускает задачи
// Методы GULP:
// gulp.task() - определяет задачу
// return gulp.src('src/js/**/*') - возвращает в задачу gulp.task() исходные файлы
// .pipe() - передает данные в "трубу"/"поток" кода компилятора для обработки при помощи подключаемых плагинов в список зависимостей (package.json)
// .pipe(gulp.dest('dist/')); сохраняет итоговый результат в определенную папку
// gulp.parallel() - запускает несколько задач параллельно или одновременно
// gulp.series() - запускает несколько задач последовательно
// gulp.watch() - следит за файлами
//------------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------------------------
import gulp from 'gulp';
import browserSync from 'browser-sync'; // синхронизатор браузера
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer'; // подставляет автопрефиксы для различных браузеров
import cleanCSS from 'gulp-clean-css'; // оптимизатор пробелов и пустых мест
import htmlmin from 'gulp-htmlmin'; // оптимизатор html
import imagemin from 'gulp-imagemin'; // оптимизатор картинок
import webpack from 'webpack';
import gulpWebpack  from 'webpack-stream';
import clean from 'gulp-clean';
import fs from 'fs'; // fileSystem
import fileInclude from 'gulp-file-include';
import changed from 'gulp-changed'; // обрабатывает только видимые изменения конкретных файлов
import babel from 'gulp-babel';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass(dartSass);
//------------------------------------------------------------------------------------------------------------------------------------------------

// jsonServer-------------------------------------------------------------------------------------------------------------------------------------
import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
server.listen(5000, () => { // указываем серверный порт 5000 ('http://localhost:5000/menu') в фетч запросах, чтобы не было конфликтов с browserSync
	console.log('JSON Server is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> JSON Server is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> JSON Server is running');
});
//--------------------------------------------------------------------------------------------------------------------------------------------

gulp.task('clean', function(done) {
	if (fs.existsSync('./dist/')) { // через файловую систему проверяем наличие папки, при наличии удаляем все содержимое
		return gulp
			.src('./dist/', {read: false}) // данная опция ускоряет проверку наличия директории dist, так как внутри не читает файлы
			.pipe(clean({force: true})) // {force: true} удаляет файлы, которые блокируются системой до подтверждения согласия на удаление
		;	
	}
	done(); // если папки нет, процесс завершается коллбэк функцией!!!
});

gulp.task('browserSyncServer', function() { // Static server запускается функция сервер из указанной папки src
	browserSync({
		server: {
			baseDir: 'dist' // запускаем browserSync из готовой скомпилированной папки dist
		}
	});
	gulp.watch('src/*.html').on('change', browserSync.reload); // следит за изменениями всех файлов и обновляет страницу, обновляя все файлы, даже не измененные 
});

//новая задача стайлс берет данные и возвращает по выполнению скомпилированные файлы sass/scss во всех папках src/css, так же синхронизирует браузер как лайв-сервер
//outputStyle - итоговый стиль compressed - сжатый, on('error', sass.logError)) - подскажет об ошибке  и ему добавиться суффикс ".мин" + автопрефиксы добавляются, после префиксов файл очищается
gulp.task('styles', function() { // передаем в GULP задачу task, первым аргументом идет наименование действия styles => следим и обрабатываем изменения стилей или внешних видов файлов
	return gulp
		.src('src/sass/**/*.+(scss|sass|css)') // используем компиляцию для всех папок и файлов внутри папки sass и scss, и sass (css - на всякий "пожарный" случай)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // запускает компилятор сжатия и подсказывает, если есть ошибка
		.pipe(rename({suffix: '.min', prefix: ''})) // переименовщик в style.min.css
		.pipe(autoprefixer()) // подставляем автопрефиксы в style.min.css для последних версий браузеров, настройки берет из package.json
		.pipe(cleanCSS({compatibility: 'ie8'})) // после автопрефиксов style.min.css будет очищаться
		.pipe(gulp.dest('dist/css')) // определяем папку назначения после компиляции style.min.css
		.pipe(browserSync.stream()) // перезапускает browserSync в потоке
	;	
}); //задача на отслеживание изменений в коде src/sass по факту изменений запускается стайлс и обновляет  browserSync - наш браузер

//так же отслеживает изменения в файлах по каждому обновлению браузера
gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/**/*.html').on('change', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('webpack', 'jsLibs'));
	gulp.watch('src/**/*.php').on('change', gulp.parallel('php'));
	gulp.watch('src/*.json').on('change', gulp.parallel('json'));
	gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
	gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
	gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
	gulp.watch('src/files/**/*').on('all', gulp.parallel('files'));
});

gulp.task('html', function() {	
	return gulp
		.src([ // выбираем конкретные папки для обработки текущих изменений с помощью массива
			'src/*.html',
			'src/html/pages/*.html',
			// '!src/section/*.html', => можно указать конкретные папки или файлы, которые не нужно обрабатывать плагином
		])
		// .pipe(changed('dist/')) - тут мешает, так как нет синхронизации с browserSync
		.pipe(fileInclude({ // плагин объединения блоков в html на основе объекта с ключевыми свойствами и их значениями 
			prefix: '@@', // данные префиксы позволяют дополнять секции в html для многостраничных сайтов, оптимизирует работу [ вставляем @@include('html/sections/nav.html') ]
			basepath: '@file', // это настройка пути файла для дополнения в html
		}))
		.pipe(htmlmin({collapseWhitespace: true})) // удаляем пробелы и оптимизируем код
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream())
	;
});

gulp.task('webpack', function() { // передаем в GULP задачу task, первым аргументом идет наименование действия webpack => отслеживаем и обрабатываем изменения в конкретной папке,
	return gulp // вторым аргументом передаем функцию function(done){}, функция внутри любой задачи GULP должна возвращать return в pipe() "поток"/"трубу" кода данные
		.src('src/js/**/*.js') // передаем в GULP данные о всех исходных файлах папки src/js для компилирования => отслеживания и обработки
		.pipe(changed('dist/webpack'))
		.pipe(babel())
		.pipe(gulpWebpack(webpackConfig, webpack)) // запускаем development-сборку JS-файлов в соответствии с настройками в webpack.config.js, передаем файлы из .src() для обработки плагинами
		.pipe(gulp.dest('dist/webpack')) // передаем в pipe() "поток"/"трубу" кода компилятора информацию о папке размещения конечных скомпилированных файлов
		.pipe(browserSync.stream()) // перезапускаем браузер через плагин browserSync в потоке pipe()
	;	
}); // если ввести команду в терминале консоли gulp webpack, то задача webpack будет запущена индивидуально!!!

gulp.task('jsLibs', function() {
	return gulp
		.src('src/js/libs/*.js')
		.pipe(changed('dist/webpack/libs'))
		.pipe(gulp.dest('dist/webpack/libs'))
		.pipe(browserSync.stream())
	;
});

gulp.task('php', function() {
	return gulp
		.src('src/**/*.php')
		.pipe(changed('dist/'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream())
	;
});

gulp.task('json', function() {
	return gulp
		.src('src/*.json')
		.pipe(changed('dist/'))
		.pipe(gulp.dest('dist/'))
		// .pipe(browserSync.stream()) // убрал обновление браузера, чтобы при изменении базы данных не обновлялся браузер, иначе переоткрываются модальные окна
	;
});

gulp.task('fonts', function() {
	return gulp
		.src('src/fonts/**/*')
		.pipe(changed('dist/fonts'))
		.pipe(gulp.dest('dist/fonts'))
		.pipe(browserSync.stream())
	;
});

gulp.task('icons', function() {
	return gulp
		.src('src/icons/**/*')
		.pipe(changed('dist/icons'))
		.pipe(gulp.dest('dist/icons'))
		.pipe(browserSync.stream())
	;
});

gulp.task('images', function() {
	return gulp
		.src('src/img/**/*')
		.pipe(changed('dist/img'))
		.pipe(imagemin({verbose: true})) // verbose: true - отображает величину оптимизации картинок
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream())
	;
});

gulp.task('mailer', function() {
	return gulp
		.src('src/mailer/**/*')
		.pipe(changed('dist/mailer')) 
		.pipe(gulp.dest('dist/mailer'))
		.pipe(browserSync.stream())
	;
});

gulp.task('files', function() {
	return gulp
		.src('src/files/**/*')
		.pipe(changed('dist/files'))
		.pipe(gulp.dest('dist/files'))
		.pipe(browserSync.stream())
	;
});

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel(
		'watch', 
		'browserSyncServer', 
		'styles', 
		'html',
		'webpack',
		'jsLibs', 
		'php', 
		'json', 
		'fonts', 
		'icons', 
		'images', 
		'mailer',
		'files',
	),
));
// это итоговая задача по сборке GULP, определяем gulp.task() и даем ему имя default первым аргументом, это позволит запускать данную задачу в терминале консоли просто командой gulp,
// это имя таска по умолчанию (можно аналогично ввести gulp default, но просто gulp удобнее), вторым аргументом передаем метод gulp.series() для последовательного запуска задач clean и затем gulp.parallel(),
// первый аргумент - задачу clean, передаем в виде строки, так как определяем задачи в синтаксисе в виде строк, данная задача будет удалять предыдущую папку dist/ и формировать новую, 
// чтобы неактуальные файлы не мешали сборке, второй аргумент - задача gulp.parallel() будет запускать весь описанный список задач одновременно
//------------------------------------------------------------------------------------------------------------------------------------------------