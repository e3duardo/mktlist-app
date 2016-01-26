(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListasController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();

            //function
            var comprar = new WinJS.Binding.List([
                //{ name: "Lista 1", icon: "images/people/person1.png", time: "26/01", readStateColor: "rgba(255, 255, 255, .4)", readStateWeight: "", messageText: "Supermercados Teste" },
                { name: "Lista 1", icon: "holder.js/30x20", date: "26/01", supermercado: "Supermercados Teste" },
                { name: "Comprar no sabado", icon: "holder.js/30x20", date: "29/07", supermercado: "Casa e Video" },
                { name: "teste", icon: "holder.js/30x20", date: "24/01", supermercado: "Internet" },
                { name: "Comprar quarta", icon: "holder.js/30x20", date: "12/08", supermercado: "Teste" }
            ]);

            var compradas = new WinJS.Binding.List([
                { name: "Teste", icon: "holder.js/30x20", date: "12/12", supermercado: "Isto é um teste" }
            ]);


            WinJS.Namespace.define("Sample", {
                Comprar: comprar,
                Compradas: compradas
            });
            //end function

            WinJS.UI.processAll().then(function () {
               
            });
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

    }

})();
