var express = require('express');
var router = express.Router();
router.get('/',function (req,res) {
    //如果点击后就销毁session
    // req.session.destroy(function(err) {
    //     // cannot access session here
    // });
    req.session.user =null;
    res.clearCookie('session_id');
    res.status(302).redirect('/login');
});

module.exports = router;