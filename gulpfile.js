'use strict';

/*
1、less编译
2、js合并、压缩、混淆
3、img复制
4、html压缩
*/

//在gulp代码中先载入gulp包，因为这个包提供了一些API

var gulp = require('gulp');

var less  = require('gulp-less');
var cssnano = require('gulp-cssnano');


//1、less编译
gulp.task('style',function(){
    //这里是在执行style任务时，自动执行

    //匹配多个规则，第二个是不匹配 _ 的less文件，_ 的less文件我们默认是被导入的less文件
    //合并没有必要，一般预处理css都可以打包，导入
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({
        stream:true
    }));
})


//2js合并、压缩、混淆
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩

gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({
        stream:true
    }));
})

//3、img复制(这个不需要工具包，gulp里面自己就提供了，所以不需要资源引入)
gulp.task('image',function(){
    gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(browserSync.reload({
        stream:true
    }));
})

//4、html压缩(htmlmin的调用方法去看官方文档)
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments:true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
        stream:true
    }));
})

//5、创建自动化同步的服务器

var browserSync = require('browser-sync');
gulp.task('serve',function(){
    browserSync({
        server: {
            baseDir:['dist']
        }
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})