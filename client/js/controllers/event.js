//EventController
app.controller('EventCtrl', ['$scope', '$routeParams', 'Event', 'EventImages', function ($scope, $routeParams, Event, EventImages){
	
	//URL event argument
	if(angular.isDefined($routeParams.id)){
		$scope.thisEvent = Event.get({id:$routeParams.id});
		$scope.imgs = EventImages.get({id:$routeParams.id});

	}
	    
	// if not event => $scope.thisEvent = undefined

	
}]);