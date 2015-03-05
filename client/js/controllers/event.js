//EventController
app.controller('EventCtrl', ['$scope', '$routeParams', 'Event', 'EventImages', function ($scope, $routeParams, Event, EventImages){
	
	//URL event argument
	if(angular.isDefined($routeParams.id)){
		$scope.thisEvent = Event.get({id:$routeParams.id}, function(data){
			$scope.thisEvent = data;
		});
		$scope.imgs = EventImages.get({id:$routeParams.id}, function(data){
			$scope.imgs = data;
		});
	}
	// if not event => $scope.thisEvent = undefined

	$scope.dateNotExpired=function(date){
		return Date.parse(date)>Date.now();
	}   
	
	
}]);