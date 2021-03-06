﻿/*
AngularJS Fake List Service (Local Storage)

A fake list service that stores lists in local storage in the browser, it mimics the 
behaviour of the real list service by returning promises and using $timeout.

When creating a list, the service checks if a title is already taken and returns an 
error message, in a real implementation using a web service this action would be 
performed on the server.

To switch between using this fake list service and the real one above update the 
scripts section at the bottom of the index.html file.
*/
(function () {
    'use strict';

    angular
        .module('app')
        .factory('ListService', ListService);

    ListService.$inject = ['$timeout', '$filter', '$q', 'WebSqlService'];
    function ListService($timeout, $filter, $q, WebSqlService) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("SELECT * FROM mk_list",
                        [],
                        function (tx, rs) { deferred.resolve(rs.rows); },
                        handleError);

            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("SELECT * FROM mk_list WHERE id=?",
                        [id],
                        function (tx, rs) {
                            if (rs.rows.length == 1)
                                deferred.resolve(rs.rows[0]);
                        },
                        handleError);

            return deferred.promise;
        }

        function Create(list) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("INSERT INTO mk_list (title, store, color) VALUES (?, ?, ?)",
                        [list.title, list.store, list.color],
                        function () { deferred.resolve({ success: true }); },
                        handleError);

            return deferred.promise;
        }

        function Update(list) {
            var deferred = $q.defer();

            // TODO: make code for update
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            WebSqlService.ExecuteSql("DELETE FROM mk_list WHERE id=?",
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