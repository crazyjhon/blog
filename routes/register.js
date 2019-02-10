var express = require('express');
var User = require('../model/user.js');
var md5 = require('blueimp-md5');
var router = express.Router();

router.get('/',function (req,res) {
    res.render('register.html')
});
//用户名是否已经注册
router.post('/username',function (req,res) {
    //如果是校验，那么返回的值是{'valid': true or false}，true表示可用
    User.findOne({username:req.body.username},function (error,data) {
        if (data){
            res.json({'valid':false});
        }else{
            res.json({'valid':true});
        }
    });
});
//注册
router.post('/',function (req,res) {
    req.body.password = md5(req.body.password);
    new User(req.body).save(function (err,data) {
        if (err) {
            res.status(500).json({
                        err_code : 500,
                        message :'服务端错误'
                    })
        }else{
            //给客户端一个session,session里面的user属性保存了客户的信息；
            req.session.user = data;
            res.status(200).json({
                //这里用err_code的值去代表状态比较好
                err_code:1,
                message:'ok'
            });
        }
    });
});


module.exports = router;