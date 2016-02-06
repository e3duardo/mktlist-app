(function () {
    'use strict';

    angular
        .module('app')
        .controller('DetailsListController', DetailsListController);

    DetailsListController.$inject = ['$location', 'ListService', 'ListItemService', 'UserService', '$routeParams', '$rootScope', 'FlashService'];
    function DetailsListController($location, ListService, ListItemService, UserService, $routeParams, $rootScope, FlashService) {
        var vm = this;
        vm.list = null;
        vm.allitems = null;
        vm.newitem = newitem;
        vm.deleteitem = deleteitem;

        //control
        vm.contentDialogHidden = true;
        vm.showContentDialog = showContentDialog;

        initController();




        function initController() {
            loadCurrentList();
        }

        function loadCurrentList() {
            ListService.GetById($routeParams.listId)
                .then(function (list) {
                    vm.list = list;
                    loadAllItems();
                });
        }

        function loadAllItems() {
            ListItemService.GetAll($routeParams.listId)
                .then(function (items) {
                    vm.allitems = items;
                });
        }

        function newitem() {
            vm.dataLoading = true;

            vm.nitem.list_id = $routeParams.listId;

            ListItemService.Create(vm.nitem)
                .then(function (response) {
                    if (response.success) {
                        loadCurrentList();//TODO: deve exsistir jeito melhor de atualizar um ng-repeat
                        FlashService.Success('Registration successful', true);
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
        function deleteitem(id) {

            ListItemService.Delete(id)
                .then(function (response) {
                    if (response.success) {
                        loadCurrentList();//TODO: deve exsistir jeito melhor de atualizar um ng-repeat
                        FlashService.Success('Registration successful', true);
                    } else {
                        FlashService.Error(response.message);
                    }
                });
        }

        function showContentDialog() {
            WinJS.UI.processAll().done(function () {
                    var contentDialog = document.querySelector(".win-contentdialog").winControl;
                    contentDialog.show();
            });
        }
    }
})();
