
class homeController{
    // [GET] /
    index(req, res){
        res.render('login');
    }
}

module.exports = new homeController;
