const db = require('../../database');
class managerController{
    // [GET] /
    index(req, res){

        if(req.session.isAdmin){
            var sql = "SELECT * FROM musicians";
            db.query(sql, function(err, results) {
                if (err) throw err;
                var kq = results;
                var sql1 = "SELECT * FROM singers";
                db.query(sql1, function(err, results){
                    var kq1 = results;
                    res.render('manager',{
                        musicians: kq,
                        singers: kq1,
                        name: req.session.name,
                        isAdmin: req.session.isAdmin
                    });
                })
                
            })
            
        }else{
            res.redirect('/');
        }
        
    }
}

module.exports = new managerController;
