// CommandController
app.controller('CommandCtrl', ['$scope', '$routeParams', 'Event', 'Command', 'EventImages', 'Ticket',  function ($scope, $routeParams, Event, Command, EventImages, Ticket){
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
						(ticketTmp.used == true)?ticketTmp.used = "Oui":ticketTmp.used = "Non";
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
	});
}]);