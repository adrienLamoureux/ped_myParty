// CommandController
app.controller('CommandCtrl', ['$scope', '$routeParams', 'Event', 'Command', 'EventImages', 'Ticket', 'CancelTicket','ngProgress', '$window', '$timeout',  function ($scope, $routeParams, Event, Command, EventImages, Ticket, CancelTicket, ngProgress, $window, $timeout){
	ngProgress.color("#B40404");
	ngProgress.start();
	
	$scope.command = Command.get({id:$routeParams.id}, function (cmdData){
		$scope.command = cmdData;
		$scope.events = [];
		angular.forEach(cmdData.eventTickets, function (eventTicket, key){
			var evnt = Event.get({id:eventTicket.eventID}, function (evntData){
				evnt = evntData;
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

	$scope.cancelCommand = function (idCommand){
		ngProgress.start();
		var canceled = true;
		var partiallyCanceled = false;
		var cptTicket = 0 ;
		var cptEvent = 0;
		var command = Command.get({id:idCommand}, function (commandData){
			command = commandData;
			
			cptEvent = command.eventTickets.length;
			angular.forEach(command.eventTickets, function (eventTicket, key){
			
				var evnt = Event.get({id:eventTicket.eventID}, function (eventData){
					evnt = eventData;

					if (Date.parse(evnt.dateStarting) > Date.now()){
						var cptType = {};
						
						angular.forEach(evnt.ticketsType, function (type, key){
							cptType[type.uniqueID] = 0;
						});

						cptTicket += eventTicket.tickets.length;

						angular.forEach(eventTicket.tickets, function (ticketId, key){
							var ticket = CancelTicket.get({id:ticketId}, function (ticketData){
								ticket = ticketData;

								cptType[ticket.ticketTypeID]++;
								cptTicket--;

								if (cptTicket == 0){
									angular.forEach(evnt.ticketsType, function (tType, key){
										tType.sold-= cptType[tType.uniqueID];
										tType.ticketLeft += cptType[tType.uniqueID];
									});

									evnt = Event.put({id:evnt._id}, evnt, function (eventData){
										evnt = eventData;
										partiallyCanceled = true;
										cptEvent --;

										$timeout( function(){ 									
											if (cptEvent <= 1) {
												command.canceled = canceled;
												command.partiallyCanceled = partiallyCanceled;
												command = Command.put ({id:idCommand}, command, function (commandData2){
													command = commandData2;
													ngProgress.complete();
													$window.location.href = '#/usr/cmds';		
												}, function (err){
													console.log (err);
												});
											};
										}, 1000);
									}, function (err){
										console.log(err);
									});	
								};
							}, function (err){
								console.log(err);
							});
						});
					} else {
						canceled = false;
						cptEvent --;
						if (cptEvent <= 1) {
							command.canceled = canceled;
							command.partiallyCanceled = partiallyCanceled;
							command = Command.put ({id:idCommand}, command, function (commandData2){
								command = commandData2;
								ngProgress.complete();
								$window.location.href = '#/usr/cmds';
							}, function (err){
								console.log (err);
							});
						};
					};
				}, function (err){
					console.log(err);
				});
			});
		}, function (err){
			console.log(err);
		});
	};
}]);