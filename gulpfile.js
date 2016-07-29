var RootPath = '';

var baseJsList = [
    // RootPath + "dist/game.js",
    RootPath + "lib/ionic/js/ionic.bundle.js",
    RootPath + "lib/howler.min.js",
    RootPath + "lib/ionic/js/storage.js",
    RootPath + "js/angular-resource.js",
    RootPath + "js/myclass/myclass.js",
    RootPath + "js/business.tool.js",
    RootPath + "js/initPick.js",
    RootPath + "js/resultTodo.js",
    RootPath + "js/business.tool.js",
    RootPath + "js/submitTodo.js",
    RootPath + "js/globleSetting.js",

    RootPath + "js/app.js",
    RootPath + "js/controllers.js",
    RootPath + "js/animation.js"
    
]


//var baseJsList = [
//    RootPath + "lib/jquery-2.1.4.min.js",
//    RootPath + "lib/ionic/js/ionic.bundle.js",
//    RootPath + "lib/ionic/js/storage.js",
//    RootPath + "lib/howler.min.js",
//    RootPath + "js/angular-resource.js",
//]

var baseJsList2 = [
    RootPath + "dist/game.js",
    RootPath + "js/business.tool.js",
    RootPath + "js/app.js",
    RootPath + "js/controllers.js",
    RootPath + "js/animation.js"
]

baseJsList.concatName = 'app.js'; //输出文件名称
baseJsList.distPath = 'dist'; //输出文件目录

baseJsList2.concatName = 'b.js'; //输出文件名称
baseJsList2.distPath = 'dist'; //输出文件目录

var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');


//压缩合并css
gulp.task('appCss', function () {
    return gulp.src(['css/ionic.css', 'css/style.css', 'css/extrastyle.css'])//文件源
        .pipe(concat('app.css'))
        .pipe(minifycss())//执行压缩
        .pipe(rename({suffix: '.min'}))//重命名
        .pipe(gulp.dest('dist'))//输出文件夹
});

gulp.task('baseJs', function () {
    return gulp.src(baseJsList)
        .pipe(concat(baseJsList.concatName)) //合并所有js到base-all.js
        .pipe(gulp.dest(baseJsList.distPath)) //输出base-all.js到文件夹
        .pipe(rename({suffix: '.min'}))//rename压缩后的文件名
        .pipe(uglify()) //压缩
        .pipe(gulp.dest(baseJsList.distPath)); //输出
});

gulp.task('b', function () {
    return gulp.src(baseJsList2)
        .pipe(concat(baseJsList2.concatName)) //合并所有js到base-all.js
        .pipe(gulp.dest(baseJsList2.distPath)) //输出base-all.js到文件夹
        .pipe(rename({suffix: '.min'}))//rename压缩后的文件名
        .pipe(uglify()) //压缩
        .pipe(gulp.dest(baseJsList2.distPath)); //输出
});


// gulp.task('temp', function () {
//     return gulp.src('debug.index.html')//文件源,
//         .pipe(concat('index.html'))
//         .pipe(minifyHTML())//执行压缩
//         .pipe(rename({suffix: '.min'}))//重命名
//         .pipe(gulp.dest('./'))//输出文件夹
// });


gulp.task('mainHtml', function () {
    return gulp.src('*.html')//文件源
        .pipe(minifyHTML())//执行压缩
        .pipe(rename({suffix: '.min'}))//重命名
        .pipe(gulp.dest('./'))//输出文件夹
});

gulp.task('default', ['baseJs', 'appCss']);



