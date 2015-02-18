// Event Frm Directive Controller
app.controller('EventFrmCtrl', ['$scope', 'NewEvent',  function ($scope, NewEvent){
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
		'avaible': false
	};

	$scope.formData = angular.copy($scope.defaultEvent);


	// restore form
    $scope.cancel = function() {
		$scope.formData = angular.copy($scope.defaultEvent);
   	};


   	// when submitting the add form, send the text to the node API
    $scope.createEvent = function() {
    	NewEvent.create($scope.formData);
  	}

}]);
