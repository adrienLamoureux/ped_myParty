// Event List Directive Controller
app.controller('EventListCtrl', ['$scope', 'Event', function ($scope, Event){
	$scope.events = Event.query(function(data){
		$scope.events = data;
	});
}]);