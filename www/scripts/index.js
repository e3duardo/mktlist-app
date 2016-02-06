// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    //if (device.platform == "windows") {
    // Get the back button working in WP8.1
    WinJS.Application.onbackclick = function () {
        onBackKeyDown();
        return true; // This line is important, without it the app closes.
    }
    //}
    //else {
    //    document.addEventListener("backbutton", onBackKeyDown, false);
    //}


    function onDeviceReady() {
        console.clear();
        console.warn('Console cleared!');


        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });

        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onBackKeyDown() {
        console.warn('Back key down');
        window.history.back();
    }
})();