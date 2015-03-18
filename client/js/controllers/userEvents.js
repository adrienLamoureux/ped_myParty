// User Events
app.controller('UserEventsCtrl', ['$rootScope', '$scope', '$routeParams', 'Event', 'EventImages', 'EventByOrganizerId', 'User', 'Command', 'ngProgress', function ($rootScope, $scope, $routeParams, Event, EventImages, EventByOrganizerId, User, Command, ngProgress){

	ngProgress.color("#B40404");
	

	//URL user argument
	$scope.events = [];
	ngProgress.start();
	$scope.events = EventByOrganizerId.query({id:$rootScope.user.user_id}, function(data){
		$scope.events = data;

		//compute Global Income
		$scope.income = 0;
		for (var e=0; e < $scope.events.length; ++e) {
			//console.log($scope.events[e]);
			$scope.events[e].income = 0;
		
			for (var t=0; t < $scope.events[e].ticketsType.length; ++t) {
				//console.log($scope.events[e].ticketsType[t]);
	    		$scope.events[e].ticketsType[t].income = $scope.events[e].ticketsType[t].sold * $scope.events[e].ticketsType[t].price;
	    		$scope.events[e].income += $scope.events[e].ticketsType[t].income;
	    	}
	    	$scope.income += $scope.events[e].income;
		}
		ngProgress.complete();
	});
	ngProgress.reset();
	ngProgress.start();

	//get user participated events
	$scope.participatedEvent = [];
	var mongoUser = User.get({id:$rootScope.user.user_id}, function (data){
		mongoUser = data;
			
		angular.forEach(mongoUser.commandsID, function (commandID, key1){
			
			var command = Command.get({id:commandID}, function (cmd){
				command = cmd;
			
				angular.forEach(command.eventTickets, function (eventT, key2){
					var eventTmp = Event.get({id:eventT.eventID}, function (evnt){
						eventTmp = 	evnt;
						$scope.participatedEvent.push(eventTmp);
					});
				});
				ngProgress.complete();
			}, function (err){
				console.log(err);
			});
		});
	}, function (err){
		console.log (err);
	});

	/*var mongoUser = User.get({id:$rootScope.user.user_id}, function (data){
		mongoUser = data;
			
		var commands = Command.get({id:mongoUser.commandsID}, function (cmds){
			commands = cmds;

			angular.forEach(commands.commands, function (command, key1){
				angular.forEach(command.eventTickets, function (eventT, key2){
					var eventTmp = Event.get({id:eventT.eventID}, function (evnt){
						eventTmp = 	evnt;
						$scope.participatedEvent.push(eventTmp);
					});
				});
			});
		});
	});*/
	
	$scope.organised=true;
	$scope.participed=false;

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
		// TODO: Event cancelation + sending mail
		// mark all tickets as used
		event.canceled=true;
		Event.put({id:event._id}, event);
	}
}]);