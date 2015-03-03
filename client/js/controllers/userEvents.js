// User Events
app.controller('UserEventsCtrl', ['$scope', '$routeParams', 'Event', 'EventByOrganizerId', function ($scope, $routeParams, Event, EventByOrganizerId){

	//URL user argument
	$scope.events = EventByOrganizerId.query({id:$routeParams.id});

	$scope.dateNotExpired=function(date){
		return Date.parse(date)>Date.now();
	}
	
	$scope.publish = function(event){
		event.online = true;
		Event.put(event._id, event);
	}

	$scope.delete = function(event){
		Event.remove(event._id);
	}

	$scope.cancel = function(event){
		//TODO: Event cancelation + sending mail and payback all customers!
		Event.remove(event._id);
	}
}]);