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

app.directive('eventMiniature', function (){
	return {
		restrict: 'E',
		controller: 'EventCtrl',
		templateUrl: '../../partials/eventMiniature.html'
	};
});