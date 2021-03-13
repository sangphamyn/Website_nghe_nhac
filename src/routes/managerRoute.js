const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const db=require('../database');
const managerController = require('../app/controllers/ManagerController');

router.get('/', managerController.index);
//Upload
var rand, rand1 = "1", rand2, randM;
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './src/public/uploads')
    },
    filename: function(req, file, callback) {
        rand = file.originalname;
        randM = rand;
        if(rand1 == "1")
            rand1 = rand;
        else {
            rand2 = rand;
            //rand1 = "1";
        }
        callback(null, rand);
    }
})
var rand_1;
var storage1 = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './src/public/uploads')
    },
    filename: function(req, file, callback) {
        rand_1 = file.originalname;
        callback(null, rand_1);
    }
})
var upload = multer({storage: storage});
var upload1 = multer({storage: storage1});
router.post('/uploadSong',upload.fields([{
    name: 'userbg', maxCount: 1
},{
    name: 'userFile', maxCount: 1
}]), function(req, res) {
    var linkSong = './uploads/' + rand1;
    var linkImg = './uploads/' + rand2;
    rand1 = "1";
    inputData ={
        song_link: linkSong,
        song_image: linkImg,
        song_name: req.body.nameSong,
        musician_id: req.body.nameArtist,
        singer_id: req.body.nameSinger,
        song_lyric: req.body.nameLyric
    }
    var sql='SELECT * FROM songs WHERE song_name =?';
    db.query(sql, [inputData.song_name] ,function (err, data, fields) {
        if(err) throw err
        if(data.length>=1){
            var msg = inputData.song_name+ " đã được tải lên từ trước";
            res.redirect('/manager');
        }else{
            var sql = 'INSERT INTO songs SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg ="Tải lên thành công";
            res.redirect('/songs');
        }
    })
})
//Upload Song//
//Upload musician
router.post('/uploadMusician',upload1.single('imgMusician'), function(req, res) {
    var link = './uploads/' + rand_1;
    inputData ={
        musician_image: link,
        musician_name: req.body.nameMusician,
        musician_namsinh: req.body.namsinh
    }
    var sql='SELECT * FROM musicians WHERE musician_name =?';
    db.query(sql, [inputData.musician_name] ,function (err, data, fields) {
        if(err) throw err
        if(data.length>1){
            var msg = inputData.musician_name+ " đã có";
            res.render('manager',{alertMsg_register:msg});
        }else{
            var sql = 'INSERT INTO musicians SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg ="Tải lên thành công";
        }
    })
    if(req.body.isSinger == "on"){
        var sql1='SELECT * FROM singers WHERE singer_name =?';
        //var link = './uploads/' + rand1;
        inputData1 ={
            singer_image: link,
            singer_name: req.body.nameMusician,
            singer_namsinh: req.body.namsinh
        }
        db.query(sql1, [inputData1.singer_name] ,function (err, data, fields) {
            if(err) throw err
            if(data.length>1){
                var msg = inputData1.singer_name+ " đã có";
                res.render('manager',{alertMsg_register:msg});
            }else{
                var sql = 'INSERT INTO singers SET ?';
                db.query(sql, inputData1, function (err, data) {
                    if (err) throw err;
                });
                var msg ="Tải lên thành công";
            }
        })
    }
    res.redirect('/musicians');
})
//Upload musician//
//Upload singer
router.post('/uploadSinger',upload1.single('imgSinger'), function(req, res) {
    var link = './uploads/' + rand_1;
    inputData ={
        singer_image: link,
        singer_name: req.body.nameSinger,
        singer_namsinh: req.body.namsinh
    }
    var sql='SELECT * FROM singers WHERE singer_name =?';
    db.query(sql, [inputData.singer_name] ,function (err, data, fields) {
        if(err) throw err
        if(data.length>1){
            var msg = inputData.singer_name+ " đã có";
            res.render('manager',{alertMsg_register:msg});
        }else{
            var sql = 'INSERT INTO singers SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg ="Tải lên thành công";
        }
    })
    if(req.body.isMusician == "on"){
        inputData1 ={
            musician_image: link,
            musician_name: req.body.nameSinger,
            musician_namsinh: req.body.namsinh
        }
        var sql='SELECT * FROM musicians WHERE musician_name =?';
        db.query(sql, [inputData1.musician_name] ,function (err, data, fields) {
            if(err) throw err
            if(data.length>1){
                var msg = inputData1.musician_name+ " đã có";
                res.render('manager',{alertMsg_register:msg});
            }else{
                var sql = 'INSERT INTO musicians SET ?';
                db.query(sql, inputData1, function (err, data) {
                    if (err) throw err;
                });
                var msg ="Tải lên thành công";
            }
        })
    }
    res.redirect('/singers');
})

//Upload singer//
module.exports = router;
