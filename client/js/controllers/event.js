//EventController
app.controller('EventCtrl', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event){
	
	//URL event argument
	if(angular.isDefined($routeParams.id)){
		$scope.thisEvent = Event.get({id:$routeParams.id});
	}
	// if not event => $scope.thisEvent = undefined
}]);