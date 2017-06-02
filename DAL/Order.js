/**
 * Created by ron on 6/1/2017.
 */
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    'orderID': Number,
    'stations': Array,
    'company': String,
    'orderDetails': Object,
    'priority': String,
    'status': String,
    'lastUpdate': Date,
    'assignedTo': String
}, { collection: 'Orders'}, { minimize: false });

var Orders = mongoose.model('Orders', orderSchema);

// new Orders({
//     "orderID": 1,
//     "stations": [
//         1,
//         2,
//         3
//     ],
//     "company": "dor alon",
//     "orderDetails": {
//         "gasType": [
//             95,
//             98
//         ],
//         "amount": 1000
//     },
//     "priority": "1",
//     "status": "review",
//     "lastUpdate": "05/27/2017",
//     "assignedTo": "2"
// }).save(function (err, order) {
//     console.log('saved order:');
//     console.log(order);
// });
//
// new Orders({
//     "orderID": 2,
//     "stations": [
//         4,
//         5,
//         6
//     ],
//     "company": "dor alon",
//     "orderDetails": {
//         "gasType": [
//             95,
//             98
//         ],
//         "amount": 1000
//     },
//     "priority": "2",
//     "status": "active",
//     "lastUpdate": "05/27/2017",
//     "assignedTo": ""
// }).save(function (err, order) {
//     console.log('saved order:');
//     console.log(order);
// });

module.exports = {
    orderModel: Orders
}
