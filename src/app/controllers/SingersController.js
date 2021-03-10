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
            
            res.render('singerInfo',{
                songs: kq,
                name: req.session.name,
                isAdmin: req.session.isAdmin
            });
        })
    }
}

module.exports = new singersController;
