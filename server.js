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
var path    = require("path");

// configuration =================
// 'mongodb://ronbiter:rb171290!@ftscluster-shard-00-00-pgdhp.mongodb.net:27017,ftscluster-shard-00-01-pgdhp.mongodb.net:27017,ftscluster-shard-00-02-pgdhp.mongodb.net:27017/admin?ssl=true&replicaSet=FTSCluster-shard-0&authSource=admin'
// 'mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts'
mongoose.connect('mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.set('view engine', 'html');

// define model =================
var navPointsSchema = new mongoose.Schema({
    name: String,
    type: String,
    coords: [{ coordName: String, lat: Number, lng: Number}]
});

var NavPoints = mongoose.model('NavPoints', navPointsSchema);

var navs = new NavPoints({
    name: 'Delek Nav Points',
    type: 'NavPointsList',
    coords: [
        {
            coordName: 'tahana 1',
            lat: 31.794696,
            lng: 34.645896
        },
        {
            coordName: 'tahana 2',
            lat: 31.784071,
            lng: 34.673281
        },
        {
            coordName: 'tahana 3',
            lat: 31.766121,
            lng: 34.666414
        }
    ]
})

// navs.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//     console.log('navs model saved')
// })

// routes ================
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})


// api ===================

// get all stations nav points
app.get('/api/stations', function (req, res) {

    //[TODO] this is still not working correctly, it returns an html page instead of the json response.

    console.log("searching db");

    // use mongoose to get all navs in the database
    NavPoints.find(function (err, navs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }


        console.log(navs);
        res.json(navs); // return all navs in JSON format
    })
})

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");