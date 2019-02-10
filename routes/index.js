var express = require('express');
var Posts = require('../model/posts');
var router = express.Router();
    router.get('/',function (req,res) {
        var message = {};
        if (req.session.user) {
            message.user = req.session.user;
        }
        Posts.find()
            .exec(function (err,data) {
            if (err) {
                return err
            }
            message.article = data;
            res.render('index.html',{message:message});
        });
    });
module.exports = router;