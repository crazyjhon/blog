//导包
var express = require('express');
var path = require('path');
//ueditor
var ueditor = require("ueditor");


var index = require('./routes/index.js');
var register = require('./routes/register.js');
var login = require('./routes/login.js');
var logout = require('./routes/logout.js');
var posts = require('./routes/posts.js');
var bodyParser = require('body-parser');
var session = require('express-session');

//创建服务器
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());



//使用模块
app.use("/ueditor/ue", ueditor(path.join(__dirname, './public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/uploads/img/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


//模板引擎,html结尾文件渲染
app.engine('html',require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
//设定渲染的路径，第一个参数是views,第二个参数是要改变的路径，默认views
// app.set('views','./public/');
//开放node_modules文件夹
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')));
app.use('/public',express.static(path.join(__dirname,'./public/')));
app.use('/ueditor',express.static(path.join(__dirname,'./ueditor/')));
//挂载session中间件
app.use(session({
    //secret，配置加密字符串，它会在原有的基础上再和secret的值去拼接加密
    //目的是加强安全性，防止客户端恶意伪造
    name:'session_id',
    secret: 'thisisastring',
    resave: false,
    saveUninitialized: false//true 无论是否使用session,默认只要对页面发起请求，都会给客户端一个cookie
}));
//路由
app.use('/',index);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);
app.use('/posts',posts);
// app.use(function (req,res) {
//    return res.redirect('/');
// });



//监听
app.listen(4000,function () {
    console.log('server is running');
});