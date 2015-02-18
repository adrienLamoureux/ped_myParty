//EventController
app.controller('EventCtrl', ['$scope', 'Event', 'EventByOrganizerId', function ($scope, Event, EventByOrganizerId){

	$scope.events = {};
	$scope.eventsByOrganizerId = {};

	$scope.getEvents = function (){
		$scope.events = Event.querry().then(function (){
			alert ('Event : Requete SUCCESS !!!');
		}, function (){
			alert ('Event : erreur pendant la requete !!!');
		});
	};

	$scope.getEventsByOrganizerId = function (id){
		$scope.events = EventByOrganizerId.querry(id).then(function (){
			alert ('EventByOrganizerId : Requete SUCCESS !!!');
		}, function (){
			alert ('EventByOrganizerId : erreur pendant la requete !!!');
		});
	};



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
	

}]);