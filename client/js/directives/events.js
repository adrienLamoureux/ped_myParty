// Events Directive 
app.directive('eventList', function (){
	return {
		restrict: 'E',
		controller: 'EventCtrl',
		templateUrl: '../../partials/events.html'
	};
});

app.directive('eventFrm', function (){
	return {
		restrict: 'E',
		controller: 'EventCtrl',
		templateUrl: '../../partials/frmEvent.html'
	};
});