/*
AngularJS Fake User Service (Local Storage)

A fake user service that stores users in local storage in the browser, it mimics the 
behaviour of the real user service by returning promises and using $timeout.

When creating a user, the service checks if a username is already taken and returns an 
error message, in a real implementation using a web service this action would be 
performed on the server.

To switch between using this fake user service and the real one above update the 
scripts section at the bottom of the index.html file.

>>>>nomadev.com.br/angularjs-promises-promessas-o-guia-definitivo/ 
*/
(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$rootScope', '$timeout', '$filter', '$q', 'WebSqlService'];
    function UserService($rootScope, $timeout, $filter, $q, WebSqlService) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Authenticate = Authenticate;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("SELECT * FROM mk_user",
                        [],
                        function (tx, rs) { deferred.resolve(rs.rows); },
                        handleError);

            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("SELECT * FROM mk_user WHERE id=?",
                        [id],
                        function (tx, rs) {
                            if (rs.rows == 1)
                                deferred.resolve(rs.rows[0]);
                        },
                        handleError);

            return deferred.promise;
        }

        function Authenticate(username, password) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("SELECT * FROM mk_user WHERE username=? AND password=?",
                        [username, password],
                        function (tx, rs) { deferred.resolve(rs.rows); },
                        handleError);

            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("INSERT INTO mk_user (firstName, lastName, username, password) VALUES (?, ?, ?, ?)",
                        [user.firstName, user.lastName, user.username, user.password],
                        function () { deferred.resolve({ success: true }); },
                        handleError);

            return deferred.promise;
        }

        function Update(user) {
            //var deferred = $q.defer();

            //var users = getUsers();
            //for (var i = 0; i < users.length; i++) {
            //    if (users[i].id === user.id) {
            //        users[i] = user;
            //        break;
            //    }
            //}
            //setUsers(users);
            //deferred.resolve();

            //return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("DELETE FROM mk_user WHERE id=?",
                        [id],
                        function () { deferred.resolve({ success: true }); },
                        handleError);

            return deferred.promise;
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                console.error(error);
                return { success: false, message: error };
            };
        }

    }
})();