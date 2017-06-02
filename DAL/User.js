/**
 * Created by ron on 6/1/2017.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    'userId': Number,
    'name': String,
    'email': String,
    'password': String,
    'role': String,
    'remember': Boolean
}, { collection: 'Users'})

var Users = mongoose.model('Users', userSchema);

// var adminUser = new Users( {
//     userId: 1,
//     name: 'ron',
//     email: 'ronbiter@gmail.com',
//     password: '12345',
//     role: 'admin',
//     remember: true
// });
//
// adminUser.save(function (err, admin) {
//     console.log('saved admin user:');
//     console.log(admin);
// })
//
// var driverUser = new Users({
//     userId: 2,
//     name: 'bob',
//     email: 'bob@gmail.com',
//     password: '12345',
//     role: 'driver',
//     remember: true
// });
//
// driverUser.save(function (err, driver) {
//     console.log('saved driver user:');
//     console.log(driver);
// });

module.exports = {
    userModel: Users
}