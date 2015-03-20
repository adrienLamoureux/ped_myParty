// Application MyParty
var app = angular.module('MyPartyApp', ['naif.base64', 'ngRoute', 'ngResource', 'ja.qr', 'UserApp','ngProgress', 'ui', 'ui-notification']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: './partials/home.html',
			controller: 'HomeCtrl',
			public: true
		})
		.when('/usr', {
			templateUrl: './partials/profile.html',
			controller: 'UserCtrl'
		})
		.when('/usr/basket', {
			templateUrl: './partials/basket.html',
			controller: 'BasketEventCtrl'
		})
		.when('/usr/cmds', {
			templateUrl: './partials/commands.html',
			controller: 'CommandsCtrl'
		})
		.when('/usr/cmd/:id', {
			templateUrl: './partials/command.html',
			controller: 'CommandCtrl'
		})
		.when('/usr/events', {
			templateUrl: './partials/userEvents.html',
			controller: 'UserEventsCtrl'
		})
		.when('/event/create', {
			templateUrl: './partials/createEvent.html',
			controller: 'EventCtrl'
		})
		.when('/event/:id', {
			templateUrl: './partials/event.html',
			controller: 'EventCtrl',
			public: true
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
		.when('/login',{
			templateUrl : './partials/login.html',
			controller: 'LoginCtrl',
			login: true
		})
		.when('/signup', {
			templateUrl : './partials/signup.html',
			public: true
		})
		.when('/verify/email', {
			templateUrl: './partials/verify_email.html', 
			verify_email: true
		})
		.when('/reset-password', {
			templateUrl: './partials/reset_password.html',
			public: true
		})
		.when('/set-password', {
			templateUrl: 'partials/set_password.html', 
			controller: 'UserCtrl',
			set_password: true
		})
		.when('/payment/:id/:total', {
			templateUrl: 'partials/payment.html',
			controller: 'PaymentCtrl'
		})
		.otherwise({redirectTo: '/'});
});

app.run(function(user) {
	user.init({ appId: '54f5bfbac1eb6' });
});


