//Navigation Bar Directive
app.directive('navBar', function (){
	return {
		restrict: 'E',
		controller: 'NavigationCtrl',
		templateUrl: '../../partials/navigation.html'
	};
});