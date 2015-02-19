// Event List Directive Controller
app.controller('EventListCtrl', ['$scope', function ($scope){
	$scope.events = Event.query();
}]);