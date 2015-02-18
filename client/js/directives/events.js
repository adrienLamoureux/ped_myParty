// Events Directive 
app.directive('eventList', function (){
	return {
		restrict: 'E',
		controller: 'EventCtrl',
		templateUrl: '../../partials/events.html'
	};
});