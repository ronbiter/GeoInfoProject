/**
 * Created by ron on 5/7/2017.
 */
var app = angular.module('FtsApp.Services', []);

app.service('FtsDataService', ['$http', '$cookies', function ($http, $cookies) {

    this.user = {
        name: '',
        email: '',
        password: '',
        remember: false,
        role: ''
    };

    this.Login = function (username, password, remember) {
        // make an http GET request to get user data from server.

        this.user.name = 'ron'
        this.user.email = username;
        this.user.password = password;
        this.user.remember = remember;
        this.user.role = 'admin';

        if(remember) {
            $cookies.putObject('logedUser', this.user);
            console.log('logedUser cookie saved')
        }
        else {
            var d = new Date();
            d.setDate(d.getDate() + 1)
            $cookies.putObject('logedUser', this.user, {
                expires: d
            });
            console.log('logedUser cookie saved')
        }

        return this.user;
    }

    this.Logout = function() {

        $cookies.remove('logedUser');

        this.user = {
            name: '',
            email: '',
            password: '',
            remember: false,
            role: ''
        };

        return this.user;

    }

    this.GetLogedUser = function () {
        var user = $cookies.getObject('logedUser');
        if(user != undefined) {
            return user;
        }
        else {
            return this.user;
        }
    }

}])