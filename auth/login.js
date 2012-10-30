exports.loginPage = function(req, res) {
    res.render("auth/login.jade");
}


exports.loginUser = function(req, res) {
    res.render('auth/login');
}

exports.logout = function(req, res) {
    res.render('auth/login');
}
