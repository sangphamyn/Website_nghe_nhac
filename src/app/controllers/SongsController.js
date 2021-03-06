const db = require('../../database');
const fs = require("fs");

class songsController{
    // [GET] /
    
    index(req, res){
        var sql = "SELECT * FROM songs,singers WHERE songs.singer_id = singers.singer_id";
        db.query(sql, function(err, results) {

            if (err) throw err;
            var kq = results;

            /*for(var i=0; i<results.length; i++){
                fs.writeFile(`./src/public/uploads/${kq[i].song_name}.txt`, kq[i].song_lyric,  function(err) {
                });
            }*/
            var songTab = 'song-tab';
            res.render('songs',{
                songs: kq,
                songTab: songTab,
                name: req.session.name,
                isAdmin: req.session.isAdmin
            });
        })
    };
    destroy(req, res){
        var id = req.params.id;
        var sql = `DELETE FROM songs WHERE song_id = '${id}'`;
        db.query(sql, function (err, result) {
          if (err) throw err;
          res.redirect('/songs');
        });
    }
}

module.exports = new songsController;
