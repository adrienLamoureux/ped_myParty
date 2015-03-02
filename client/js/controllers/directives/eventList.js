// Event List Directive Controller
app.controller('EventListCtrl', ['$scope', 'Event', function ($scope, Event){
	$scope.events = Event.query();
}]);