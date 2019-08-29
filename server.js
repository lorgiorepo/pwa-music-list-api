require('dotenv').load();
var  express       = require('express'),
     jwt           = require('jsonwebtoken'),
     morgan        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     User          = require('./server/models/user.server.model'),
     cors          = require('cors'),
     secrets       = require('./config/secrets'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes');

var port = process.env.PORT || 3333;

/**
 * Connect to MongoDB.
 */
testdb.dbconnect();


/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */

// Force HTTPS on heroku
if(process.env.NODE_ENV === 'production'){
  app.enable('trust proxy');
  app.use (function (req, res, next) {
      if(req.secure) {
        //request was via https, so do no special handling
        next();
      } else {
        //request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
      }
  });
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public')); //use to serve static files like favicon, css, angular and the rest

/**
 * Routes Configuration
 */
route(app);

app.get('*', function(req, res) {
     res.sendFile(__dirname + '/public/index.html' );
});


/**
 * Start Express server.
 */
app.listen( port, function(){
  console.log("PWA API Server Listening on port ", port );
});