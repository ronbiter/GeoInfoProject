/**
 * Created by ron on 5/6/2017.
 */

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
//var Users = require('./DAL/User');                     // mongoose for mongodb

var DAL = require('./DAL/DAL');                     // mongoose for mongodb


var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path    = require("path");

// configuration =================
// 'mongodb://ronbiter:rb171290!@ftscluster-shard-00-00-pgdhp.mongodb.net:27017,ftscluster-shard-00-01-pgdhp.mongodb.net:27017,ftscluster-shard-00-02-pgdhp.mongodb.net:27017/admin?ssl=true&replicaSet=FTSCluster-shard-0&authSource=admin'
// 'mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts'
// mongoose.connect('mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts');     // connect to mongoDB database on modulus.io
// mongoose.set('debug', true);
//
// mongoose.connection.on("open", function(){
//     console.log("mongodb is connected!!");
// });

app.use(express.static(__dirname + '/'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.set('view engine', 'html');


// define models and schemas =================

// =======================
// schemas ===============
// =======================
//var userSchema = new DAL.mongoose.Schema({ url: String, text: String, id: String}, { collection: 'Users'})
var fuelStationSchema = new DAL.mongoose.Schema({ url: String, text: String, id: String}, { collection: 'FuelStations'})
//var ordersSchema = new DAL.mongoose.Schema({ url: String, text: String, id: String}, { collection: 'Orders'})




// =======================
// models ================
// =======================
//var Users = DAL.mongoose.model('Users', userSchema);
var FuelStations = DAL.mongoose.model('FuelStations', fuelStationSchema)
//var Orders = DAL.mongoose.model('Orders', ordersSchema)



// =======================
// routes ================
// =======================
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
})

// =======================
// api ===================
// =======================

// user login logic
app.get('/api/User/Login', function (req, res) {

    DAL.userModel.userModel.find({
        email: req.query.email,
        password: req.query.password
    }, function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }

        //console.log(users);
        // check we only got 1 user back (email and password match)
        if(users.length == 1) {
            // return the user as a json
            users[0].remember = req.query.remember;
            res.json(users[0]);
        }
        else {
            res.json(undefined);
        }
    })

});

// get all stations
app.get('/api/stations', function (req, res) {

    console.log("searching db for stations");

    // use mongoose to get all stations in the database
    FuelStations.find(function (err, navs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }


        //console.log(navs);
        res.json(navs); // return all navs in JSON format
    })
})

// get station by id
app.get('/api/stations/station', function (req, res) {

    var p = parseInt(req.query.stationId);
    FuelStations.find({
        stationId: p
    }, function (err, station) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }

        //console.log(station);

        // check we only got 1 order back
        if(station.length == 1) {
            // return the order as a json
            res.json(station[0]);
        }
        else {
            res.json(undefined);
        }
    })

});

// get all orders
app.get('/api/orders', function (req, res) {

    console.log("searching db for ordes");

    // use mongoose to get all orders in the database
    DAL.orderModel.orderModel.find(function (err, orders) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }


        //console.log(orders);
        res.json(orders); // return all navs in JSON format
    })
})

// get order by id
app.get('/api/orders/order', function (req, res) {

    var p = parseInt(req.query.orderID);
    DAL.orderModel.orderModel.find({
        orderID: p
    }, function (err, orders) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }

        //console.log(orders);

        // check we only got 1 order back
        if(orders.length == 1) {
            // return the order as a json
            res.json(orders[0]);
        }
        else {
            res.json(undefined);
        }
    })

});

// update order
app.post('/api/orders/updateOrder', function (req, res) {
    var p = req.body.params.order;
    var conditions = { _id: p._id },
        update = { priority: p.priority, status: p.status, lastUpdate: (new Date()).toDateString(), assignedTo: p.assignedTo };
    console.log(update);
    DAL.orderModel.orderModel.findByIdAndUpdate(
        conditions,
        update,
        function (err, order) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            console.log(err);
            res.send(err);
        }
        //console.log('updated order:');
        //console.log(orders);


        //check we only got 1 order back
        if(order) {
            console.log('order before change:');
            console.log(order);
            order.priority = p.priority;
            order.status = p.status;
            order.lastUpdate = new Date();
            order.assignedTo = p.assignedTo;
            console.log('order after change:');
            console.log(order);

            order.save(function (err, updatedOrder) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                console.log('updated order:');
                console.log(updatedOrder);
                res.json(updatedOrder);
            });
        }
        else {
            res.json(undefined);
        }
    })
});

// get all drivers
app.get('/api/drivers', function (req, res) {

    console.log("searching db for drivers");

    // use mongoose to get all stations in the database
    DAL.userModel.userModel.find(
        { role:'driver' },
        function (err, drivers) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        {
            console.log(err)
            res.send(err)
        }


        //console.log(navs);
        res.json(drivers); // return all navs in JSON format
    });
});


// ======================= // ======================= // =======================
// listen (start app with node server.js) ======================================
// ======================= // ======================= // =======================
app.listen(3000);
console.log("App listening on port 3000");