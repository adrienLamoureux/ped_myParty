// User Events
app.controller('UserEventsCtrl', ['$scope', 'EventByOrganizerId', function ($scope, EventByOrganizerId){
	$scope.events = EventByOrganizerId.query('54f46c978af637f4488e3afb');//TODO: session userID
}]);