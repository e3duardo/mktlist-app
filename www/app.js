//AngularJS App.js

//The part of this file related to authentication is in the run function, when the 
//    app starts it checks if there's a cookie containing user credentials meaning 
//    the user has already logged in, this is to keep the user logged in after a 
//    page refresh.

//On each location change there's a check to verify that the user is logged in if 
//trying to access a restricted page, if not they're redirected to the login page.
(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/lists', {
                controller: 'ListsController',
                templateUrl: 'lists/lists.view.html',
                controllerAs: 'vm'
            })
            .when('/createlist', {
                controller: 'CreateListController',
                templateUrl: 'lists/create.view.html',
                controllerAs: 'vm'
            })
            .when('/detailslist/:listId', {
                controller: 'DetailsListController',
                templateUrl: 'lists/details.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();
