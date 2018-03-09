#生成项目
```bash
    cd m.cqssc & express -e & npm install
```
#集成gulp
```bash
    npm install gulp
                gulp-concat                         //文件合并
                gulp-clean-css                      //css压缩
                gulp-minify-html                    //html压缩
                gulp-rename                         //文件重命名
                gulp-uglify                         //javascript压缩
                gulp-jshint                         //javascript语法检查
                gulp-imagemin                       //图片压缩
                gulp-sass                           //编译sass
                gulp-autoprefixer                   //浏览器前缀
                gulp-notify                         //通知
                gulp-clean                          //清理文件
                gulp-cache                          //图片缓存
            --save-dev
    创建 gulpfile.js
```
#集成bower
```
    npm install --save-dev
    bower init
    创建 .bowerrc                                   //指定directory,定义下载路径
    bower install jquery ionic --save
```
#规划目录
    public目录分为dist和src目录
    src下分为sass fonts imgs scripts

#目录结构
```bash
    [m.cqssc]
        ├── bin
        │   └── www
        ├── libs
        ├── node_modules
        ├── public
        │   ├── dist
        │   └── src
        │       ├── fonts
        │       ├── imgs
        │       ├── sass
        │       └── scripts
        ├── routes
        │   ├── index.js
        │   └── users.js
        ├── views
        │   ├── error.ejs
        │   └── index.ejs
        ├── .bowerrc
        ├── app.js
        ├── bower.json
        ├── gulpfile.js
        ├── package.json
        └── readme.md
```

#热部署
```bash
    npm install node-dev --save-dev
    package.json  "start": "node-dev ./bin/www"
```

#相关规范
```bash
    图片：
            1.命名时使用中划线-;
            2.对图片的操作只是压缩

    css:
            1.基于sass
            2.第三方库独立，不与其他文件进行合并
            3.变量和函数定义放在单独的文件保存(包括定义基准的宽高以及基准字体大小，颜色值以及一些mixin函数等等)
            4.公共组件放在一个文件中保存(容器，按钮，图标，表单元素等)
            5.每个栏目建一个目录,最终进行合并
```
