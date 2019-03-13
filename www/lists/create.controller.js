(function () {
    'use strict';

    angular
        .module('app')
        .controller('CreateListController', CreateListController);

    CreateListController.$inject = ['ListService', '$location', '$rootScope', 'FlashService'];
    function CreateListController(ListService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        
        initController();
        


        function initController() {
            $('.color').colorpicker();
        }


        function register() {
            vm.dataLoading = true;
            ListService.Create(vm.list)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/lists');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }
})();
