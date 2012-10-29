var views = require('./views.js');

module.exports = function(app){
    app.post(/\//, views.comment);
    app.get(/\/comments/, views.getComments);
};
