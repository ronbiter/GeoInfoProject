/**
 * Created by ron on 6/1/2017.
 */
var mongoose = require('mongoose');                    // mongoose for mongodb
var userModel = require('./User');
var orderModel = require('./Order');

mongoose.connect('mongodb://ronbiter:rb171290@ds127101.mlab.com:27101/fts');     // connect to mongoDB database on modulus.io
mongoose.set('debug', true);

mongoose.connection.on("open", function(){
    console.log("mongodb is connected!!");
});

module.exports = {
    userModel: userModel,
    orderModel: orderModel,
    mongoose: mongoose
};

