/**
 * Created by ron on 5/6/2017.
 */

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
// 'mongodb://ronbiter:rb171290!@ftscluster-shard-00-00-pgdhp.mongodb.net:27017,ftscluster-shard-00-01-pgdhp.mongodb.net:27017,ftscluster-shard-00-02-pgdhp.mongodb.net:27017/admin?ssl=true&replicaSet=FTSCluster-shard-0&authSource=admin'
// 'mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts'
mongoose.connect('mongodb://ronbiter:rb171290@ftscluster-shard-00-00-pgdhp.mongodb.net:27017,ftscluster-shard-00-01-pgdhp.mongodb.net:27017,ftscluster-shard-00-02-pgdhp.mongodb.net:27017/admin?ssl=true&replicaSet=FTSCluster-shard-0&authSource=admin');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.set('view engine', 'html');

// define model =================
var Navs = mongoose.model('Navs', {
    nav : Object
});

// routes ================
app.get('/', function (req, res) {
    res.render('/Index');
})

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");