// Event Frm Directive Controller
app.controller('EventFrmCtrl', ['$scope', '$rootScope', 'Event', 'EventImages', '$window', '$timeout', function ($scope, $rootScope, Event, EventImages, $window, $timeout){
	var cptType = 0;
	$scope.loading=true;
	$scope.defaultEvent = {
		'ownerID': $rootScope.user.user_id, //TODO : Récupérer le User ID en session
		'title': '',
		'description': '',
		'country': '',
		'county': '',
		'city': '',
		'zipCode': '',
		'street': '', 
		'imageSmall': null,
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
		'dateStarting': null,
		'dateEnding': null,
		'online': false
	};

	$scope.defaultImages = {
		'eventID': null, 
		'backgroundImg': null,
		'ticketImg':null
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
	};

	$scope.eventPost = null;

	$scope.editMode = (angular.isDefined($scope.thisEvent));
	$timeout( function(){ initForm();$scope.loading=false; }, 200);	

	
	// initialize / restore form
    function initForm() {	
    	if($scope.editMode){
			$scope.eventFormData = angular.copy($scope.thisEvent);
			$scope.eventFormData.dateStarting = new Date($scope.eventFormData.dateStarting);
			$scope.eventFormData.dateEnding = new Date($scope.eventFormData.dateEnding);
			angular.forEach($scope.eventFormData.ticketsType, function(ticket,i) {
	    		ticket.expirationDate = new Date(ticket.expirationDate);
	    	});
			$scope.eventFormImage = angular.copy($scope.imgs);
		}else{
			$scope.eventFormData = angular.copy($scope.defaultEvent);
			$scope.eventFormImage = angular.copy($scope.defaultImages);
		}
		$scope.now = Date.now();
   	};

   	$scope.cancel = initForm;

   	// when submitting the add form, send the text to the node API
    $scope.createEvent = function(published) {
    	$scope.eventFormData.online = published;
    	angular.forEach($scope.eventFormData.ticketsType, function(ticket,i) {
    		ticket.uniqueID = i;
    	});
    	$scope.eventPost = Event.post($scope.eventFormData, function(data){
    		$scope.eventPost = data;
    		$scope.eventFormImage.eventID = $scope.eventPost._id;
    		EventImages.post($scope.eventFormImage);
    		var route = "";
    		if(published){
    			route = "#/event/" + $scope.eventPost._id;
    		}else{
				route = "#/usr/events";
    		}
    		console.log("next page : " + route);
    		$window.location.href = route;
    		$window.location.reload();	
    	});
  	}

  	// when submitting the edit form, send the text to the node API
    $scope.updateEvent = function(published) {
    	$scope.eventFormData.online = published;
    	angular.forEach($scope.eventFormData.ticketsType, function(ticket,i) {
    		ticket.uniqueID = i;
    	});

    	Event.put({id:$scope.eventFormData._id}, $scope.eventFormData, function (){
    		console.log("EVENT PUT OK");
    		EventImages.put({id:$scope.eventFormImage._id}, $scope.eventFormImage, function (){
    			console.log("IMAGES PUT OK");
    			
    		});
    		console.log($rootScope.user.user_id);
    		var route = "";
    		if(published){
    			route = "#/event/" + $scope.eventFormData._id;
    		}else{
				route = "#/usr/events";
    		}
    		console.log("next page : " + route);
    		$window.location.href = route;
    		$window.location.reload();
    	});
  	}
}]);
