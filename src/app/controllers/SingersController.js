const db = require('../../database');
class singersController{
    // [GET] /
    index(req, res){
        var sql = "SELECT * FROM singers";
        db.query(sql, function(err, results) {

            if (err) throw err;
            var kq = results;
            
            res.render('singers',{
                singers: kq,
                name: req.session.name,
                isAdmin: req.session.isAdmin
            });
        })
    }
    show(req, res){
        var slug = req.params.slug;
        var sql = `SELECT * FROM songs WHERE singer_id = ${slug}`;
        db.query(sql, function(err, results) {

            if (err) throw err;
            var kq = results;
            var sql1 = `SELECT * FROM singers WHERE singer_id = ${slug}`;
            db.query(sql1, function(err, results) {
                res.render('singerInfo',{
                    songs: kq,
                    singer: results,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                });
            })
        })
    }
}

module.exports = new singersController;
