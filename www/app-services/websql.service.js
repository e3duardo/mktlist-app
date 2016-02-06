(function () {
    'use strict';

    angular
        .module('app')
        .factory('WebSqlService', WebSqlService);

    WebSqlService.$inject = ['$rootScope'];
    function WebSqlService($rootScope) {
        var service = {};
        var db = null;

        service.ExecuteSql = ExecuteSql;

        initService();

        return service;

        function initService() {
            var dbSize = 5 * 1024 * 1024; // 5MB

            db = openDatabase("mktlist", "0.1", "mktlist db", dbSize, function () {
                console.info('WEBSQL: open or create database');
            });

            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS mk_user (ID INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, username TEXT, password TEXT, date TEXT)", [],
                    function () { console.info('WEBSQL: create table mk_user'); },
                    function () { console.error('WEBSQL: error on create table mk_user'); });

                tx.executeSql("CREATE TABLE IF NOT EXISTS mk_list (ID INTEGER PRIMARY KEY ASC, title TEXT, store TEXT, color TEXT, date TEXT)", [],
                    function () { console.info('WEBSQL: create table mk_list'); },
                    function () { console.error('WEBSQL: error on create table mk_list'); });
            });
        }

        function ExecuteSql(sql, params, onSuccess, onError) {
            db.transaction(function (tx) {
                tx.executeSql(sql, params, onSuccess, onError);
            });
        }
    }
})();
