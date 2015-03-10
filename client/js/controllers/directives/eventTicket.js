app.controller('EventTicketCtrl', ['$scope', '$routeParams','Event', function ($scope, $routeParams, Event){
	var urlDeploy = "";
	$scope.qrcode = urlDeploy+"#/event/"+$routeParams.id+"/ticket/"+$routeParams.idt+"/validate";
	console.log($scope.qrcode);
	if(angular.isDefined($routeParams.id)){
		Event.get({id:$routeParams.id}, function(data){
			console.log(data);
			$scope.event = data;
			console.log($routeParams.idt);
			for(var i=0; i<$scope.event.tickets.length; ++i){
				if($scope.event.tickets[i].qRCodeUniqueID == $routeParams.idt){
					for(var j=0; j<$scope.event.ticketsType.length;++j){
						if($scope.event.tickets[i].ticketTypeID == $scope.event.ticketsType[j].uniqueID){
							$scope.ticket = $scope.event.ticketsType[j];
							console.log("found");
							console.log($scope.ticket);	
						}
					};
				};
			};
		});
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