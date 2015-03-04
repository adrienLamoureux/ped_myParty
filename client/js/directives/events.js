// Events Directive 
app.directive('eventList', function (){
	return {
		restrict: 'E',
		controller: 'EventListCtrl',
		templateUrl: '../../partials/directives/events.html'
	};
});

app.directive('eventFrm', function (){
	return {
		restrict: 'E',
		controller: 'EventFrmCtrl',
		templateUrl: '../../partials/directives/frmEvent.html'
	};
});

app.directive('eventMiniature', function (){
	return {
		restrict: 'E',
		controller: 'EventMiniatureCtrl',
		templateUrl: '../../partials/directives/eventMiniature.html'
	};
});

app.directive('eventTicketValidation', function (){
	return {
		restrict: 'E',
		controller: 'EventTicketValidationCtrl',
		templateUrl: '../../partials/directives/eventTicketValidation.html'
	};
});

