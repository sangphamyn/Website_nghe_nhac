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
}

module.exports = new musiciansController;
