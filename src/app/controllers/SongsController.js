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
            
            res.render('songs',{
                songs: kq,
                name: req.session.name,
                isAdmin: req.session.isAdmin
            });
        })
        
    }
}

module.exports = new songsController;
