// Event Frm Directive Controller
app.controller('EventFrmCtrl', ['$scope', 'Event', 'EventImages', function ($scope, Event, EventImages){
	var cptType = 0;

	$scope.defaultEvent = {
		'ownerID': null, //TODO : Récupérer le User ID en session
		'title': '',
		'description': '',
		'country': '',
		'county': '',
		'city': '',
		'zipCode': '',
		'street': '', 
		'imageSmall': '',
		'tickets': [],
		'ticketsType': [{
			'uniqueID': cptType,
			'description': '',
			'ticketLeft': 1,
			'sold': 0,
			'price': 0,
			'type': '',
			'expirationDate': null
		}],
		'uniqueTicketID': 0,
		'dateStarting': null,
		'dateEnding': null,
		'online': false
	};

	$scope.defaultImages = {
		'eventsID': null, 
		'backgroundImg': {},
		'ticketImgs':[{
			'idTicket': cptType,
			'image':{}
		}]
	};

	$scope.addNewTicketType = function (){
		cptType +=1;
		$scope.eventFormData.ticketsType.push({
			'uniqueID': cptType,
			'description': '',
			'ticketLeft': 1,
			'sold': 0,
			'price': 0,
			'type': '',
			'expirationDate': null
		});

		$scope.eventFormImage.ticketImgs.push({
			'idTicket': cptType,
			'image':{}
		});
	};

	$scope.now = Date.now();

	$scope.editMode = (angular.isDefined($scope.thisEvent));

	if($scope.editMode){
		$scope.eventFormData = angular.copy($scope.thisEvent);
		$scope.eventFormImage = angular.copy($scope.imgs);
	}else{
		$scope.eventFormData = angular.copy($scope.defaultEvent);
		$scope.eventFormImage = angular.copy($scope.defaultImages);
	}

	// restore form
    $scope.cancel = function() {
    	if($scope.editMode){
    		$scope.eventFormData = angular.copy($scope.thisEvent);
    		$scope.eventFormImage = angular.copy($scope.imgs);
    	}else{
			$scope.eventFormData = angular.copy($scope.defaultEvent);
			$scope.eventFormImage = angular.copy($scope.defaultImages);
    	}
    	$scope.now = Date.now();
   	};

   	// when submitting the add form, send the text to the node API
    $scope.createEvent = function(published) {
    	$scope.eventFormData.online = published;
    	angular.forEach($scope.eventFormData.ticketsType, function(ticket,i) {
    		ticket.uniqueID = i;
    	});
    	Event.post($scope.eventFormData);
    	EventImages.post($scope.eventFormImage);
    	// Upload d'images avec mise a jour de l'EventID
  	}

  	// when submitting the edit form, send the text to the node API
    $scope.updateEvent = function(published) {
    	$scope.eventFormData.online = published;
    	angular.forEach($scope.eventFormData.ticketsType, function(ticket,i) {
    		ticket.uniqueID = i;
    		console.log(i);
    	});
    	Event.put($scope.eventFormData._id, $scope.eventFormData);
  	}
}]);
