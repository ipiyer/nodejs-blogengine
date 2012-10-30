var views = require('./login.js');

module.exports = function(app){
    app.get(/\/admin\/login/, views.loginPage);
    app.post(/\/admin\/login/, views.loginUser);
    
    app.get(/\/admin\/logout/, views.logout);
};
