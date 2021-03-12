const db = require('../../database');
class musiciansController{
    // [GET] /
    index(req, res){
        var sql = "SELECT * FROM musicians";
        db.query(sql, function(err, results) {

            if (err) throw err;
            var kq = results;
            
            res.render('musicians',{
                musicians: kq,
                name: req.session.name,
                isAdmin: req.session.isAdmin
            });
        })
    }
    show(req, res){
        var slug = req.params.slug;
        var sql = `SELECT * FROM songs WHERE musician_id = ${slug}`;
        db.query(sql, function(err, results) {

            if (err) throw err;
            var kq = results;
            var sql1 = `SELECT * FROM musicians WHERE musician_id = ${slug}`;
            db.query(sql1, function(err, results) {
                var kq2 = results;
                var sql2 = `SELECT`
                res.render('musicianInfo',{
                    songs: kq,
                    musician: results,
                    name: req.session.name,
                    isAdmin: req.session.isAdmin
                });
            })
        })
    }
}

module.exports = new musiciansController;
