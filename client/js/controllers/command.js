// CommandController
app.controller('CommandCtrl', ['$scope', '$routeParams', 'Event', 'Command', 'EventImages', 'Ticket', 'CancelTicket','ngProgress', '$window', '$timeout', '$http', '$route', '$q', 'Notification', function ($scope, $routeParams, Event, Command, EventImages, Ticket, CancelTicket, ngProgress, $window, $timeout, $http, $route, $q, Notification){
	ngProgress.color("#B40404");
	ngProgress.start();
	
	$scope.refundButton = {}
	
	$scope.command = Command.get({id:$routeParams.id}, function (cmdData){
		$scope.command = cmdData;
		$scope.events = [];
		angular.forEach(cmdData.eventTickets, function (eventTicket, key){
			var evnt = Event.get({id:eventTicket.eventID}, function (evntData){
				evnt = evntData;
				$scope.overDated = Date.parse(evnt.dateStarting) < Date.now();
				evnt.tickets = [];
				
				angular.forEach (eventTicket.tickets, function (tid, key){
					var ticketTmp = Ticket.get({id:tid}, function (tData){
						ticketTmp = tData;
						(ticketTmp.canceled == false)?((ticketTmp.used == true)?ticketTmp.used = "Utilisé":ticketTmp.used = "Disponible"):ticketTmp.used = "Annulé";
						angular.forEach(evnt.ticketsType, function (tType, key){
							if (tType.uniqueID == ticketTmp.ticketTypeID){
								ticketTmp.ticketTypeName = tType.type;
								ticketTmp.price = tType.price;
								evnt.tickets.push(ticketTmp);
							}
						});
					}, function (err){
						console.log(err);
					});
				});

				evnt.ticketImage = EventImages.get({id:eventTicket.eventID}, function (imagesData){
					evnt.ticketImage = imagesData;
				});
				$scope.events.push(evnt);
			});
		});
		ngProgress.complete();
	});


	/* Annulation d'une commande */
	$scope.stat = null;

	$scope.cptType = [];
	
	var getAllTicketsForAnEvent = function (ticketsData, eventKey){
		var promises = [];
		angular.forEach(ticketsData, function (ticketId, key){
			var deferred = $q.defer();
			promises.push(deferred);
			Ticket.get({id:ticketId}, function (ticket){
				if (!ticket.canceled){
					CancelTicket.get({id:ticketId}, function (ticket){
						$scope.cptType[eventKey][ticket.ticketTypeID]++;
					});	
				};
				deferred.resolve($scope.cptType);
			});
		});
		return $q.all(promises);
	};

	var getAllCommandEvent = function (command, canceled, partiallyCanceled ){

		$scope.stat = {
			'canceled' : canceled,
			'partiallyCanceled' : partiallyCanceled
		};

		var promises = [];
		
		angular.forEach(command.eventTickets, function (eventTicket, key){
			var deferred = $q.defer();
			promises.push(deferred);
			Event.get({id:eventTicket.eventID}, function (evnt){
				$scope.cptType[key] = {};
				if (Date.parse(evnt.dateStarting) > Date.now()){
					
					angular.forEach(evnt.ticketsType, function (type, key2){
						$scope.cptType[key][type.uniqueID] = 0;
					});

					getAllTicketsForAnEvent(eventTicket.tickets, key)
						.then (function (cptT) {
							$timeout(function (){
								angular.forEach(evnt.ticketsType, function (tType, key3){
									tType.sold-= $scope.cptType[key][tType.uniqueID];
									tType.ticketLeft += $scope.cptType[key][tType.uniqueID];
								});
								evnt = Event.put({id:evnt._id}, evnt, function (eventData){
									evnt = eventData;
								});
							}, 1500); 
						})
						.then (function (){
							$scope.stat.partiallyCanceled = true;
							if ($scope.stat.canceled == null){
								$scope.stat.canceled = true;
								deferred.resolve($scope.stat);
							}
							else {
								$scope.stat.canceled = ($scope.stat.canceled)?true:false;	
								deferred.resolve($scope.stat);
							}
						});
				} else {
					$scope.stat.canceled = false;	
					deferred.resolve($scope.stat);	
				};				
			});
		});
 		return $q.all(promises);
	};

	$scope.cancelCommand = function (idCommand){
		ngProgress.start();

		var command = Command.get({id:idCommand}, function (commandData){
			command = commandData;
			
			getAllCommandEvent(command, null, false).then (function (stat){
				$timeout(function (){
					command.canceled = $scope.stat.canceled;
					command.partiallyCanceled = $scope.stat.partiallyCanceled;
					command = Command.put ({id:idCommand}, command, function (commandData2){
						command = commandData2;
						if (command.partiallyCanceled && command.canceled){
							refundCommand(false);
							notification5Sec("Votre commande a été annulée, vous allez bientot recevoir un remboursement.", "Annulation de commande !");							
						}
						else if (!command.partiallyCanceled && !command.canceled){
							notification5Sec("Votre commande ne peut être annulée à cause d'un énènement en cours, aucun remboursement ne sera effectué.", "Annulation de commande !");	
						}
						else if (!command.canceled && command.partiallyCanceled){
							refundCommand(false);
							notification5Sec("Votre commande a été partiellement annulée à cause d'un énènement en cours, vous ne serez remboursés que sur les tickets annulés.", "Annulation de commande !");	
						}
						else {
							console.log ("error: unpossible case")
						};
						ngProgress.complete();
						$window.location.href = '#/usr/cmds';
					}, function (err){
						console.log(err);
					});
				}, 1500);
			});
		}, function (err){
			console.log(err);
		});
	};

	var notification5Sec = function(text, notifTitle) {
		Notification.success({message: text, delay: 5000, title: '<i>'+notifTitle+'</i>'});
	};


	$scope.refundOptional = function (optionalAmount, ticketID){
		CancelTicket.get({id: ticketID}).$promise.then(function(res){
			refundCommand(true, optionalAmount * 100);
			Event.get({id : res.eventID}).$promise.then(function(evt){
				angular.forEach (evt.ticketsType, function (tType, key){
					if(tType.uniqueID == res.ticketTypeID){
						tType.sold-= 1;
						tType.ticketLeft += 1;
					}
				});
				Event.put({id: res.eventID}, evt)
			}, function(err){
				console.log(err)
			})
		}, function(err){
			console.log(err)
		})
	}


	function refundCommand(notif, optionalAmount){
		ngProgress.start();
		var data = $scope.command.charge_id;
		var refund = {}
		refund.charge_id = data
		refund.optionalA = optionalAmount;
		$http.post('/refund', refund)
		.success(function(data, status, headers, config) {
			$scope.message = data.message
			ngProgress.complete();
			if (notif){
				notification5Sec("Annulation d'un ticket, vous allez recevoir un remboursement sous quelques jours.","Remboursement Ticket")
			}
			$route.reload();
		})
		.error(function(data, status, headers, config) {
			$scope.message = data.message
			ngProgress.complete();
		});
		return false;
	}

}]);