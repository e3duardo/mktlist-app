(function () {
    'use strict';

    angular
        .module('app')
        .controller('DetailsListController', DetailsListController);

    DetailsListController.$inject = ['$location', 'ListService', 'UserService', '$routeParams', '$rootScope'];
    function DetailsListController($location, ListService, UserService, $routeParams, $rootScope) {
        var vm = this;

        vm.allLists = [];
        vm.list = null
   
        initController();


    

        function initController() {
            loadAllLists();
            loadCurrentList();
        }

        function loadCurrentList() {
            ListService.GetById($routeParams.listId)
                .then(function (list) {
                    vm.list = list;
                    console.log(list);
                    console.log($routeParams.listId);
                });
        }

        function loadAllLists() {
            ListService.GetAll()
                .then(function (lists) {
                    vm.allLists = lists;
                });
        }
    }
})();
