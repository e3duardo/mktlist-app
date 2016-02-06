// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener("backbutton", onBackKeyDown, false);

    ;

    function onDeviceReady() {

        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });

        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        //var dbSize = 5 * 1024 * 1024; // 5MB
        //var db = openDatabase("mktlist", "0.1", "mktlist db", dbSize, function () {
        //    console.info('WEBSQL: open or create database');
        //});

        //db.transaction(function (tx) {
        //    tx.executeSql("CREATE TABLE IF NOT EXISTS mk_user (ID INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, username TEXT, password TEXT, date TEXT)", [],
        //        function () { console.info('WEBSQL: create table mk_user'); },
        //        function () { console.error('WEBSQL: error on create table mk_user'); });
        //    tx.executeSql("CREATE TABLE IF NOT EXISTS mk_list (ID INTEGER PRIMARY KEY ASC, title TEXT, store TEXT, color TEXT, date TEXT)", [],
        //        function () { console.info('WEBSQL: create table mk_list'); },
        //        function () { console.error('WEBSQL: error on create table mk_list'); });
        //});
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onBackKeyDown(event) {
        event.preventDefault();
        console.error('error');
    }
})();