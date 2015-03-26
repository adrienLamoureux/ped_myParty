app.controller('EventTicketCtrl', ['$scope', '$routeParams','Event', 'Ticket', '$location', '$window', 'ngProgress', function ($scope, $routeParams, Event, Ticket, $location, $window, ngProgress){
	ngProgress.color("#B40404");
	ngProgress.start();
	
	
	var urlDeploy = $location.$$protocol + "://" + $location.$$host + ":" + $location.$$port + "/";
	$scope.qrcode = urlDeploy + "#/event/" + $routeParams.id + "/ticket/" + $routeParams.idt + "/validate";
	console.log($scope.qrcode);
	if(angular.isDefined($routeParams.id) && angular.isDefined($routeParams.idt)){
		Event.get({id:$routeParams.id}, function(data){
			$scope.event = data;
			Ticket.get({id:$routeParams.idt},function(ticket){
				for(var i=0; i<$scope.event.ticketsType.length;++i){
					if(ticket.ticketTypeID == $scope.event.ticketsType[i].uniqueID){
						$scope.ticket = $scope.event.ticketsType[i];
					}
				};
				$scope.showTicket = !ticket.canceled;
				$scope.canceledEvent = ticket.used;
				$scope.loading = false;
				ngProgress.complete();
			});
		});
	};

	$scope.printTicket = function(elt){
		var printContents = $window.document.getElementById(elt).innerHTML;
		var originalHead = $window.document.head.innerHTML;
		var popupWin = $window.open('', '_blank', 'width=850,height=600');
		popupWin.document.open()
		popupWin.document.write('<html>'+ originalHead +'<body onload="window.print()">'+ printContents + '</html>');
		popupWin.document.close();
	};
}]);