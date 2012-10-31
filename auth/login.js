var models = require('./models.js');


/*
  method: GET
  
*/


exports.loginPage = function(req, res) {
    res.render("auth/login.jade");
    
}


/*
  method : post
  

*/

exports.loginUser = function(req, res) {
    var param = req.body, email, password;

    param.email? email = param.email.trim() : false ;
    param.passwd? password = param.passwd.trim() : false ;

    if(!email || !password) {
        return res.json(404, { error: 'Parameters Required' });
    }
    
    models.User().getByEmail(email, function(err, user){
        if(!user || !user.isValidPasswd(password)) {
            return res.json(403, {error: "Wrong username/password"});

        }

        

        console.log("Logged in");

        res.send(200, "Good user");

        
        
    });

    
    
}

exports.logout = function(req, res) {
    res.render('auth/login');
}
