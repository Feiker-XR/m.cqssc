#生成项目
    cd m.cqssc & express -e & npm install

#集成gulp
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
            --save-dev
    创建 gulpfile.js

#集成bower
    npm install --save-dev
    bower init      
    创建 .bowerrc                                   //指定directory,定义下载路径
    bower install jquery ionic --save

#规划目录
    public目录分为dist和src目录
    src下分为sass fonts imgs scripts

#目录结构
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