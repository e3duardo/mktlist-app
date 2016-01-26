// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);



        var dbSize = 5 * 1024 * 1024; // 5MB

        var db = openDatabase("mktlist", "", "mktlist", dbSize, function () {
            console.log('   >sql: db successfully opened or created');
        });

        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS mk_user');
            tx.executeSql("CREATE TABLE IF NOT EXISTS mk_user(ID INTEGER PRIMARY KEY ASC, username TEXT, password TEXT, added_on TEXT)",
                [], onSuccess, onError);
            tx.executeSql("INSERT INTO mk_user(username, password, added_on) VALUES (?,?,?)", ['e3duardo', '1234', new Date().toUTCString()], onSuccess, onError);
        });

        function onSuccess(tx, data) {
            console.log('   >sql: Query completed: ' + JSON.stringify(data));
        }

        function onError(tx, error) {
            console.log('   >sql: Query failed: ' + error.message);
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };
})();

angular.module('mktlistAngular', ['winjs', 'ngRoute'])
            .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.
                  when('/login', {
                      templateUrl: '_login.html',
                      controller: 'LoginCtrl'
                  }).
                  otherwise({
                      redirectTo: '/login'
                  });
            }])
            .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
                $scope.submit = function () {
                    var u = $scope.username;
                    var p = document.getElementById('inputPassword').value;

                    var dbSize = 5 * 1024 * 1024; // 5MB

                    var db = openDatabase("mktlist", "", "mktlist", dbSize, function () {
                        console.log('   >sql: db successfully opened or created');
                    });

                    db.readTransaction(function (t) {
                        t.executeSql('SELECT * FROM mk_user WHERE username = ? AND password = ?', [u, p], function (tx, results) {
                            console.log(results.rows);
                            document.getElementById('title').innerHTML = results.rows;
                        }, function (tx, error) { console.log(error) })
                    });
                };
            }])