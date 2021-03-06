var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/', function(req, res, next) {
    var loginTab = 'login-tab';
  res.render('login',{
      loginTab: loginTab
  });
});
router.post('/', function(req, res){
    var emailAddress = req.body.email;
    var password = req.body.password;
    var sql='SELECT * FROM users WHERE email =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            req.session.name = data[0].name;
            req.session.isAdmin = data[0].isAdmin;
            res.redirect('/');
        }else{
            res.render('login',{alertMsg:"Sai email hoặc mật khẩu"});
        }
    })
})

router.post('/register', function(req, res, next) {
    inputData ={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: 0
    }

    var sql='SELECT * FROM users WHERE email =?';
    db.query(sql, [inputData.email] ,function (err, data, fields) {
        if(err) throw err
        if(data.length>1){
            var msg = inputData.email+ " đã tồn tại";
            res.render('login',{alertMsg_register:msg});
        }else{
            var sql = 'INSERT INTO users SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg ="Đăng ký thành công";
            req.session.loggedinUser= true;
            req.session.name = req.body.name;
            res.redirect('/');
        }
    })
});

module.exports = router;
