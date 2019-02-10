var express = require('express');
var Posts = require('../model/posts');
var router = express.Router();

//发表文章页面
router.get('/',function (req,res) {
    var message = {};
    if (!req.session.user) {
        return res.status(302).redirect('/');
    }
    message.user = req.session.user;
    res.render('posts.html',{message: message});
});
//文章数据发送
router.post('/',function (req,res) {
    if (!req.session.user) {
        return res.status(302).redirect('/');
    }
    new Posts(req.body).save(function (err,data) {
        if (err) {
            return res.status(500).json({
                err_code : 500,
                message :'服务端错误'
            });
        }
        res.status(200).json({
            err_code:1,
            message:'ok'
        });
    });
});
//用户博客页面
router.get('/myblog',function (req,res) {
    if (!req.session.user) {
        return res.status(302).redirect('/login');
    }
    Posts.find({username:req.session.user.username}).populate('users').exec(function (err,data) {
        console.log(data);
    })
});
module.exports = router;