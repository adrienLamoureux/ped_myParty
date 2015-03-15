app.controller('EventTicketCtrl', ['$scope', '$routeParams','Event', 'Ticket', '$location', '$window', function ($scope, $routeParams, Event, Ticket, $location, $window){
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
	/*event
	title: String,
	imageSmall: {
		filetype: String,
		filename: String,
		filesize: Number,
		base64: String
	}
	dateStarting: Date,
	dateEnding: Date


	ticket
	description: String,
	price: Number,
	type: String,
	expirationDate: Date*/