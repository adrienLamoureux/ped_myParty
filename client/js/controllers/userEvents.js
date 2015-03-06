// User Events
app.controller('UserEventsCtrl', ['$scope', '$routeParams', 'Event', 'EventByOrganizerId','$window', function ($scope, $routeParams, Event, EventByOrganizerId, $window){

	//URL user argument
	$scope.events = EventByOrganizerId.query({id:$routeParams.id});

	$scope.dateExpired=function(date){
		return Date.parse(date) < Date.now();
	}
	
	$scope.edit = function(event){
		$window.location.href = "#/event/" + event._id + "/edit";
		$window.location.reload();
	}

	$scope.publish = function(event){
		event.online = true;
		Event.put({id:event._id}, event);
	}

	$scope.delete = function(event){
		Event.delete({id:event._id});
		$scope.events = EventByOrganizerId.query({id:$routeParams.id});
	}

	$scope.cancel = function(event){
		//TODO: Event cancelation + sending mail and payback all customers!
		Event.delete({id:event._id});
		$scope.events = EventByOrganizerId.query({id:$routeParams.id});
	}
}]);