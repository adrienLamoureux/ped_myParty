// User Events
app.controller('UserEventsCtrl', ['$rootScope', '$scope', '$routeParams', 'Event', 'EventImages', 'EventByOrganizerId', 'User', 'Command', 'Ticket', 'CancelTicket', 'ngProgress', '$http', '$q', '$timeout', 'Notification', '$route' ,function ($rootScope, $scope, $routeParams, Event, EventImages, EventByOrganizerId, User, Command, Ticket, CancelTicket, ngProgress, $http, $q, $timeout, Notification, $route){

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

	var refundCommandTicket =  function (usr, event, price){
		var promises = [];
		angular.forEach (usr.commandsID, function (commandID, key){
			var deferred = $q.defer();
			promises.push(deferred);
			Command.get({id:commandID}).$promise.then(function (command){
				angular.forEach(command.eventTickets, function (evt, key){
					if(evt.eventID == event._id){
						refundTicket(price*100, command);
						deferred.resolve();
					}
					else {
						deferred.reject("erreur remboursement");
					};
				});
			});
		});
		return $q.all(promises);
	};

	var refundAllEventTickets = function (event, priceTypeAssoc){
		var promises = [];
		angular.forEach(event.tickets, function (tcktID, key){
			var deferred = $q.defer();
			Ticket.get({id:tcktID}).$promise.then( function (mongoTicket){
				if(!mongoTicket.canceled){
					mongoTicket.canceled = true;
					mongoTicket.used = true;
					Ticket.put({id:tcktID}, mongoTicket).$promise.then(function (ticketMongo){
						User.get({id : ticketMongo.userID}).$promise.then(function (usr){
							$timeout(function() {
								refundCommandTicket(usr, event, priceTypeAssoc[ticketMongo.ticketTypeID]).then(function (){
									deferred.resolve(ticketMongo);
								}, function (err){
									console.log (err);
									deferred.reject(err);
								});	
							}, 1000);
						}, function (err){
							console.log(err);
							deferred.reject(err);
						});
					}, function (err){
						console.log (err);
						deferred.reject(err);
					});
				}
				else {
					deferred.reject("Ticket déjà remboursé");
				};
			}, function (err){
				console.log(err);
				deferred.reject(err);
			});
		});
		return $q.all(promises);
	};

	$scope.cancel = function(event){
		ngProgress.start();
		var priceTypeAssoc = {};
		
		angular.forEach(event.ticketsType, function (tType, key){
			priceTypeAssoc[tType.uniqueID] = tType.price;
		});

		//refound all tickets
		refundAllEventTickets(event, priceTypeAssoc).then (function (){
			$timeout(function() {
				//remove all tickets sold
				angular.forEach (event.ticketsType, function (tType, key){
					var tmpSold = tType.sold;
					tType.sold=0;
					tType.ticketLeft += tmpSold;
				});
				event.canceled=true;
				Event.put({id:event._id}, event).$promise.then (function (event){
					ngProgress.complete();
					notification5Sec("Votre évènement a été annulé, tous les clients seront remboursés.","Annulation évènement")
					$route.reload();
				});
			}, 1000);
		}, function (err){
			console.log(err);
		});
	};

	function refundTicket(price, command){
		var data = command.charge_id;
		var refund = {}
		refund.charge_id = data
		refund.optionalA = price;
		$http.post('/refund', refund)
		.success(function(data, status, headers, config) {
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
		return false;
	}

	var notification5Sec = function(text, notifTitle) {
		Notification.success({message: text, delay: 5000, title: '<i>'+notifTitle+'</i>'});
	};

}]);