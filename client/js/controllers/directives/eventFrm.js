// Event Frm Directive Controller
app.controller('EventFrmCtrl', ['$scope', 'Event',  function ($scope, Event){
	$scope.defaultEvent = {
		'owner': null,
		'title': '',
		'description': '',
		'country': '',
		'county': '',
		'city': '',
		'zipCode': '',
		'street': '', 
		'image': '',
		'tickets': [],
		'ticketsType': [{
			'description': '',
			'ticketLeft': 1,
			'sold': 0,
			'price': 0,
			'type': '',
			'image': ''
		}],
		'uniqueTicketID': 0,
		'dateStarting': null,
		'dateEnding': null,
		'online': false
	};

	
	$scope.editMode = (angular.isDefined($scope.thisEvent));

	if($scope.editMode){
		$scope.eventFormData = angular.copy($scope.thisEvent);
		$scope.$apply();
	}else{
		$scope.eventFormData = angular.copy($scope.defaultEvent);
	}
	

	// restore form
    $scope.cancel = function() {
    	if($scope.editMode){
    		$scope.eventFormData = angular.copy($scope.thisEvent);
    	}else{
			$scope.eventFormData = angular.copy($scope.defaultEvent);
    	}
   	};


   	// when submitting the add form, send the text to the node API
    $scope.createEvent = function() {
    	Event.post($scope.eventFormData);
  	}

}]);
