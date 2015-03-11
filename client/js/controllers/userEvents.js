// User Events
app.controller('UserEventsCtrl', ['$rootScope', '$scope', '$routeParams', 'Event', 'EventImages', 'EventByOrganizerId', '$window', function ($rootScope, $scope, $routeParams, Event, EventImages, EventByOrganizerId, $window){


	//URL user argument
	$scope.events = EventByOrganizerId.query({id:$rootScope.user.user_id}, function(data){
		$scope.events = data;

		//compute Global Income
		$scope.income = 0;
		for (var e=0; e < $scope.events.length; ++e) {
			console.log($scope.events[e]);
			$scope.events[e].income = 0;
		
			for (var t=0; t < $scope.events[e].ticketsType.length; ++t) {
				console.log($scope.events[e].ticketsType[t]);
	    		$scope.events[e].ticketsType[t].income = $scope.events[e].ticketsType[t].sold * $scope.events[e].ticketsType[t].price;
	    		$scope.events[e].income += $scope.events[e].ticketsType[t].income;
	    	}
	    	$scope.income += $scope.events[e].income;
		}
	});
	

	$scope.dateExpired=function(date){
		return Date.parse(date) < Date.now();
	}

	$scope.publish = function(event){
		event.online = true;
		Event.put({id:event._id}, event);
	}

	$scope.delete = function(event){
		Event.delete({id:event._id});
		
		var eventImgs = EventImages.get({id:event._id}, function(data){
			eventImgs = data;
			EventImages.delete({id:eventImgs._id});
		});

		$scope.events = EventByOrganizerId.query({id:$rootScope.user.user_id});
	}

	$scope.cancel = function(event){
		//TODO: Event cancelation + sending mail and payback all customers!
		Event.delete({id:event._id});

		var eventImgs = EventImages.get({id:event._id}, function(data){
			eventImgs = data;
			EventImages.delete({id:eventImgs._id});
		});

		$scope.events = EventByOrganizerId.query({id:$rootScope.user.user_id});
	}
}]);