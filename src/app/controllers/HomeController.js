
class homeController{
    // [GET] /

    
    index(req, res){
        var homeTab = 'home-tab';
        res.render('home',{
            name: req.session.name,
            homeTab: homeTab,
            isAdmin: req.session.isAdmin
        });
    }
}

module.exports = new homeController;
