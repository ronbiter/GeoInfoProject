/**
 * Created by ron on 5/7/2017.
 */
var app = angular.module('FtsApp.Services', []);

app.service('FtsDataService', ['$http', '$cookies', function ($http, $cookies) {

    this.user = {
        userId: '',
        name: '',
        email: '',
        password: '',
        remember: false,
        role: ''
    };

    this.Login = function (email, password, remember) {
        // make an http GET request to get user data from server.

        return $http.get('/api/User/Login?email=' + email + '&password=' + password + '&remember=' + remember)
            .then(function (response) {
                //console.log(response);
                if(response.data != undefined) {

                    console.log(response.data);

                    this.user = response.data;

                    if(this.user.remember) {
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

                else {
                    return undefined;
                }

            });

        // this.user.name = 'ron'
        // this.user.email = email;
        // this.user.password = password;
        // this.user.remember = remember;
        // this.user.role = 'admin';


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