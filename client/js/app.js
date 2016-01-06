
var app = angular.module('AutoFlitterApp', ['ngRoute','angular-loading-bar', 'frapontillo.bootstrap-switch'])
        .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html',
            controller: 'WelcomeController'
        })
        .when('/auto-dealer-inventory', {
            templateUrl: 'partials/auto-inventory.html',
            controller: 'InventoryController'
        })
        /*
        .otherwise( {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        }
        ); 
        */
    });
    

