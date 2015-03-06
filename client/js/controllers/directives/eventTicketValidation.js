app.controller('EventTicketValidationCtrl', ['$scope', '$routeParams', 'EventTicketValidate', function ($scope, $routeParams, EventTicketValidate){
	$scope.valide = null;
	EventTicketValidate.get({id:$routeParams.id, idt:$routeParams.idt}, function (res){
		console.log(res.valide);
		$scope.valide = res.valide;
		if(res == true){
			$scope.valide = true;
			// Put without body because of security
			EventTicketValidate.put({id:$routeParams.id, idt:$routeParams.idt}, function (res){
				console.log(res);
			});
		}
		else{
			$scope.valide = false;
		};
	});
}]);
