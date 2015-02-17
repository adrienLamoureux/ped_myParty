// Application MyParty
var app = angular.module('MyPartyApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', 
{			templateUrl: './partials/home.html',
			controller: 'HomeCtrl'
		})
		.when('/usr/create', {
			templateUrl: './partials/createUser.html',
			controller: 'UserCtrl'
		})
		.when('/usr/:id', {
			templateUrl: './partials/user.html',
			controller: 'UserCtrl'
		})
		.when('/usr/:id/edit', {
			templateUrl: './partials/editUser.html',
			controller: 'UserCtrl'
		})
		.when('/usr/:id/basket', {
			templateUrl: './partials/basket.html',
			controller: 'UserCtrl'	
		})
		.when('/usr/:id/cmds', {
			templateUrl: './partials/commands.html',
			controller: 'CommandCtrl'	
		})
		.when('/usr/:id/cmd/:idcmd', {
			templateUrl: './partials/command.html',
			controller: 'CommandCtrl'	
		})
		.when('/usr/:id/events', {
			templateUrl: './partials/userEvents.html',
			controller: 'EventCtrl'	
		})
		.when('/event/create', {
			templateUrl: './partials/createEvent.html',
			controller: 'EventCtrl'
		})
		.when('/event/:id', {
			templateUrl: './partials/event.html',
			controller: 'EventCtrl'	
		})
		.when('/event/:id/edit', {
			templateUrl: './partials/editEvent.html',
			controller: 'EventCtrl'
		})
		.when('/event/:id/ticket/:idt', {
			templateUrl: './partials/ticket.html',
			controller: 'EventCtrl'	
		})
		.when('/event/:id/ticket/:idt/validate', {
			templateUrl: './partials/validate.html',
			controller: 'EventCtrl'	
		})
		.otherwise({redirectTo: '/'});
});