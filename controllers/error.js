exports.get404 = (req,res) => {
    //res.status(404).send('<h1>404 page not found</h1>');
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404', {pageTitle: "404", path:'',isAuthenticated: req.session.isLoggedIn});
}