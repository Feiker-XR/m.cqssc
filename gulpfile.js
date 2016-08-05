var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpJshint = require('gulp-jshint');
var gulpSass = require('gulp-sass');
var gulpMinifyHtml = require('gulp-minify-html');
var gulpRename = require('gulp-rename');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpNotify = require('gulp-notify');
var gulpClean = require('gulp-clean');

// var cache = require('gulp-cache'),
// var livereload = require('gulp-livereload');

var pathObj = {
	css:{
		from:'public/src/sass/**/*.scss',
		mid:'public/mid/css',
		to:'public/dist/css'
	},
	scripts:{
		from:'public/src/scripts/common/*.js',
		mid:'public/mid/scripts',
		to:'public/dist/scripts'
	}
}

// 清理
gulp.task('clean', function() {  
  return gulp.src(['dist/css', 'dist/scripts', 'dist/imgs'], {read: false})
    .pipe(gulpClean());
});

//编译sass
gulp.task('compileSass',function(){ 										
	return gulp.src(pathObj.css.from)																					//源码路径
		.pipe(gulpAutoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))		//浏览器前缀
		.pipe(gulpSass({ style: 'expanded' }))																			//编译sass
		.pipe(gulpConcat('all.css'))																					//合并文件
		.pipe(gulp.dest(pathObj.css.mid))																				//输出
		.pipe(gulpRename({suffix: '.min'}))																				//重命名
		.pipe(gulpMinifyCss())																							//压缩
		.pipe(gulp.dest(pathObj.css.to))																				//再输出
    	.pipe(gulpNotify({ message: 'Styles task complete' }));															//任务完成通知
});

// 脚本
gulp.task('scripts', function() {  
  return gulp.src(pathObj.scripts.from)
    .pipe(gulpJshint())
    .pipe(gulpConcat('common.js'))
    .pipe(gulp.dest(pathObj.scripts.mid))
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulpUglify())
    .pipe(gulp.dest(pathObj.scripts.to))
    .pipe(gulpNotify({ message: 'Scripts task complete' }));
});

// 图片
gulp.task('images', function() {  
  // return gulp.src('src/images/**/*')
  //   .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  //   .pipe(gulp.dest('dist/images'))
  //   .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('default',['clean'], function(){
	gulp.start('compileSass','scripts');
});



// 看手
gulp.task('watch', function() {

  // 看守所有.scss档
  gulp.watch(pathObj.css.from, ['compileSass']);

  // 看守所有.js档
 gulp.watch('public/scr/scripts/**/*.js', ['scripts']);

  // 看守所有图片档
  //gulp.watch('src/images/**/*', ['images']);

  // 建立即时重整伺服器
  ///var server = livereload();

  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  // gulp.watch(['dist/**']).on('change', function(file) {
  //   server.changed(file.path);
  // });

});