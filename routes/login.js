var express = require('express');
var md5 = require('blueimp-md5');
var User = require('../model/user.js');
var router = express.Router();

router.get('/',function (req,res) {
    if (req.session.user) {
        res.status(302).redirect('/');
    }else{
        res.render('login.html');
    }
});
router.post('/',function (req,res) {
    req.body.password = md5(req.body.password);
    User.findOne(req.body,function (err,data) {
        if (err) {
            return res.status(500).json({
                err_code : 500,
                message :'服务端错误'
            })
        }
        if (data){
            //如果没有session就给设定一个session
            if (!req.session.user) {
                req.session.user = data;
            }
            res.status(200).json({
                err_code : 1,
                message : '数据库验证成功'
            });
        }else{
            res.status(200).json({
                err_code :0,
                message : '用户名或密码错误'
            })
        }
    });
});

module.exports = router;