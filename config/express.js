var config = require('./config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
flash = require('connect-flash'),
passport = require('passport');

var uri = 'mongodb://localhost/kajianku-db';
var db = require('mongoose').connect(uri);

module.exports = function(){
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.set('views','./app/views'); //EJS INCLUDE START
  app.set('view engine','ejs'); // THIS TOO

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());


  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);

  app.use(express.static('./public'));// GIVE LOCATE TO USE STATIC FILEC(CSS/JQUERY)

  return app;
}
