
class homeController{
    // [GET] /
    index(req, res){
        res.render('home',{
            name: req.session.name,
            isAdmin: req.session.isAdmin
        });
    }
}

module.exports = new homeController;
