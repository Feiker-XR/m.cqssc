angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.animation'])
    .run(['$ionicPlatform', function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //  cordova.plugins.Keyboard.disableScroll(true);
            //
            //}
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('pick', {
                url: '/pick',
                templateUrl: 'templates/pick.html',
                controller: 'PickCtrl'
            })
            .state('drawing', {
                url: '/drawing',
                templateUrl:  'templates/drawing.html',
                controller: 'DrawingCtrl'
            }).state('submit', {
                url: '/submit',
                templateUrl:  'templates/submit.html',
                controller: 'submitCtrl',
                params:{totalMoney:100}
            }).state('intro', {
            url: '/intro',
            templateUrl:  'templates/intro.html',
            controller: 'IntroCtrl'
        });


        if (location.hash == '#/submit') {
            location.href = location.origin + location.pathname + location.search + "#/pick";
        }

        $urlRouterProvider.otherwise('pick');

    }]);
