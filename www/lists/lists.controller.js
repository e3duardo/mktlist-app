﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListsController', ListsController);

    ListsController.$inject = ['$location', 'ListService', 'UserService', '$rootScope'];
    function ListsController($location, ListService, UserService, $rootScope) {
        var vm = this;

        vm.allLists = [];
        vm.go = go;

        initController();


        function initController() {
            loadAllLists();
        }

        function loadAllLists() {
            ListService.GetAll()
                .then(function (lists) {
                    vm.allLists = lists;
                });
        }

        function go(path) {
            $location.path(path);
        };
    }
})();
