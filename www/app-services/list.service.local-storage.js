/*
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

    ListService.$inject = ['$timeout', '$filter', '$q'];
    function ListService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByTitle = GetByTitle;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getLists());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getLists(), { id: id });
            var list = filtered.length ? filtered[0] : null;
            deferred.resolve(list);
            return deferred.promise;
        }

        function GetByTitle(title) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getLists(), { title: title });
            var list = filtered.length ? filtered[0] : null;
            deferred.resolve(list);
            return deferred.promise;
        }

        function Create(list) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                var lists = getLists();

                var dt = new Date();

                var lastUser = lists[lists.length - 1] || { id: 0 };
                list.id = lastUser.id + 1;
                list.date = dt.getDate() + "/" + (dt.getMonth() + 1);

                // save to local storage
                lists.push(list);
                setLists(lists);

                deferred.resolve({ success: true });
            }, 1000);

            return deferred.promise;
        }

        function Update(list) {
            var deferred = $q.defer();

            var lists = getLists();
            for (var i = 0; i < lists.length; i++) {
                if (lists[i].id === list.id) {
                    lists[i] = list;
                    break;
                }
            }
            setLists(lists);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var lists = getLists();
            for (var i = 0; i < lists.length; i++) {
                var list = lists[i];
                if (list.id === id) {
                    lists.splice(i, 1);
                    break;
                }
            }
            setLists(lists);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getLists() {
            if (!localStorage.lists) {
                localStorage.lists = JSON.stringify([]);
            }

            return JSON.parse(localStorage.lists);
        }

        function setLists(lists) {
            localStorage.lists = JSON.stringify(lists);
        }
    }
})();