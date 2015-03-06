app.controller('EventTicketValidationCtrl', ['$scope', '$routeParams', 'EventTicketValidate', function ($scope, $routeParams, EventTicketValidate){
	$scope.valide = null;
	EventTicketValidate.get({id:$routeParams.id, idt:$routeParams.idt}, function (res){
		console.log(res.valide);
		$scope.valide = res.valide;
		if($scope.valide == true){
			// Put without body because of security
			EventTicketValidate.get({id:$routeParams.id, idt:$routeParams.idt, toValide:true}, function (res){
			});
		}
	});
}]);
