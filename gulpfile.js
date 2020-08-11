//Browsersync устанавливаем npm install browser-sync gulp
//npm i gulp-watch
//npm i gulp-sass
//npm i gulp-autoprefixer
//npm i gulp-sourcemaps
//npm i gulp-plumber
//npm i gulp-notify


const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

//Таск комппиляции SCSS в CSS
gulp.task('scss', function(callback) {
    return gulp.src('./app/scss/main.scss') //scr читает файл
        .pipe(plumber({
            errorHandler: notify.onError(function(err) {
                return {
                    title: 'Style',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass()) // преобразовывет css в scss
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css/')); // путь куда сохраняем css
    callback(); 
});

//Проверяем изменение в файлах и перезагружаем страницу, если изменения есть
gulp.task('watch', function() { 
    watch(['./app/*.html', './app/scss/**/*.scss'], gulp.parallel( browserSync.reload, 'scss'));
});

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});


gulp.task('default', gulp.parallel('server', 'watch', 'scss'));