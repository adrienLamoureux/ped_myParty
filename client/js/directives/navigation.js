//Navigation Bar Directive
app.directive('navBar', function (){
	return {
		restrict: 'E',
		controller: 'NavigationCtrl',
		templateUrl: '../../partials/directives/navigation.html'
	};
});

app.directive('navBarConnected', function (){
	return {
		restrict: 'E',
		controller: 'NavigationConnectedCtrl',
		templateUrl: '../../partials/directives/navigationConnected.html'
	};
});

app.directive('navBarDisconnected', function (){
	return {
		restrict: 'E',
		//controller: 'NavigationDisconnectedCtrl',
		templateUrl: '../../partials/directives/navigationDisconnected.html'
	};
});