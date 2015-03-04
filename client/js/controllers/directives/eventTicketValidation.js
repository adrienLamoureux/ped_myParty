app.controller('EventTicketValidationCtrl', ['$scope', '$routeParams', 'EventTicketValidate', function ($scope, $routeParams, EventTicketValidate){
	$scope.valide = false;
	EventTicketValidate.get({id:$routeParams.id, idt:$routeParams.idt}, function(err, res){
		// res is ticket
		if((res.used == false) && (res.dateExpiration < (new Date()))){
			$scope.valide = true;
			// Put without body because of security
			EventTicketValidate.put({id:$routeParams.id, idt:$routeParams.idt}, function(err, res){

			});
		}
	});
}]);
