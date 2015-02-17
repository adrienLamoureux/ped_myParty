// Application MyParty
var app = angular.module('MyPartyApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: './partials/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({redirectTo: '/'});
});