const express = require('express'),
      app = express(),
      engine = require('ejs-locals'),
      requess = require('request'),
      bodyParser = require('body-parser'),
      flash = require('connect-flash'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      crypto = require('crypto'),
      config = require('./config');

const passport = require('passport');


app.engine('ejs', engine);
app.set('view engine', "ejs");
app.set('views', './views');
app.use(express.static(__dirname + '/views/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    'secret': 'fdsfdsg98ds7gd9fhdf8f',
    'saveUninitialized': false,
    'resave': false
}));
app.use(cookieParser());
app.use(flash());


// Database
const db = require('./database');

// Routes
require('./routes')(app, db, crypto);

// Passport fb
require('./models/passport-facebook')(app, config, passport);






// Create server
const server = require('http').Server(app);
server.listen(config.PORT, (err) => {
    if (err) console.error(err);
    console.log(`Server is running on port ${config.PORT}`);
});