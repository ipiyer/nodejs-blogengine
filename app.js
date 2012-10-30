var express = require('express');
var http = require('http');
var path = require('path');
var ConnectCouchDB = require('connect-couchdb')(express);

var store = new ConnectCouchDB({
  // Name of the database you would like to use for sessions.
  name: 'sessions',

  // Optional. How often expired sessions should be cleaned up.
  // Defaults to 600000 (10 minutes).
  reapInterval: 600000,

  // Optional. How often to run DB compaction against the session
  // database. Defaults to 300000 (5 minutes).
  // To disable compaction, set compactInterval to -1
  compactInterval: 300000,

  // Optional. How many time between two identical session store
  // Defaults to 60000 (1 minute)
  setThrottle: 60000
});



PROJDIR = __dirname;

var app = module.exports = express();


app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.cookieParser());
    //app.use(express.cookieSession({store:store}));
    app.use(express.session({ secret: 'keyboardcat',
                              store: store,
                              key: 'sid'}));

    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.set('view engine', 'jade');
    app.set("views", path.join(PROJDIR, "templates"));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    var static = path.join(PROJDIR, 'static');
    app.use(express.static(static));
    app.get(/\/js/, express.static(path.join(static,'js')));
    app.get(/\/css/, express.static(path.join(static,'css')));
    app.get(/\/images/, express.static(path.join(static,'images')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
    app.use(function(err, req, res, next){
        console.log(err);
        res.status(500);
        res.render('500.jade', {"error": err, "status":500});
    });
});


var INSTALLED_APPS = ['./comments', './auth'];


// Import URL dispatcher
 
INSTALLED_APPS.forEach(function(i){
    require(i + "/urls.js")(app);
});



// Import settings

require(PROJDIR + '/conf/settings.js')(app, express);

// Example 404 page via simple Connect middleware
app.all('*', function(req, res){
    res.status(404);
    res.render('404.jade');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
