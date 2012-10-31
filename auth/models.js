var couch = require('../lib/couch');
var sessionsDB = new couch({'name': 'sessions'});
var userDB = new couch({'name': 'user'});
var passwdUtil = require('./password.js');

/*
  User Model
  
  @email - Email str.
  @Password - Hashed password.
  @displayName - Name of the user.

*/

var User = function() {

    var user = function(userobj) {
        this.user_ = userobj

    }

    user.prototype = {
        isValidPasswd : function(passwd) {
            return passwdUtil.checkPassword(passwd, this.user_.password);
        },
        
        authenticate : function(sessID) {
            
        }
    }
    
    var methods = {
        "getByEmail" : function(email, cb) {
            
            if(!email || !email.trim) {
                return false;
            }
            
            userDB.view('_design/user/_view/getByEmail',
                        {key: '"'+email+'"'},
                        function(err, resp) {
                            if(err){
                                cb(err, null);
                                return;
                            };

                            var rows = resp.rows;

                            if(rows.length){
                                console.log(rows[0].value);
                                user = new user(rows[0].value);
                                console.log(user);
                                cb(null, user);
                                return;
                            }

                            cb(null, null);
                        });
        },
        
        
        

    }
    
    
    return methods
    
    
}

exports.User = User
