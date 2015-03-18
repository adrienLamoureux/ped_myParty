app.controller('EventTicketValidationCtrl', ['$scope', '$rootScope', '$routeParams', 'EventTicketValidate', function ($scope, $rootScope, $routeParams, EventTicketValidate){
	var result = null;

	EventTicketValidate.get({idOwner:$rootScope.user.user_id, id:$routeParams.id, idt:$routeParams.idt}, function (res){
		result = res;

		if(result.code == 200){
			if(result.valide == true){
				$scope.message = "Validation du ticket en cours ...";
				$scope.success = true;
				// Put without body because of security
				EventTicketValidate.get({idOwner:$rootScope.user.user_id, id:$routeParams.id, idt:$routeParams.idt, toValide:true}, function (res){
					if (res.status == true){
						$scope.message = "Ticket Validé !";	
					}
					else {
						$scope.message = "Une erreur est survenue pendant la validation du ticket.."
					}
					
				});
			};	
		}
		else if(result.code == 401){
			$scope.message = "Vous ne pouvez pas valider le ticket avec votre propre compte, seul l'organisateur de l'évènement peut le faire !";
			$scope.success = false;

		}
		else if (result.code == 403){
			$scope.message = "Le ticket n'est pas valide pour cet évènement !";
			$scope.success = false;
		}
		else if (result.code == 405){
			$scope.message = "Le ticket à déjà été utilisé !";
			$scope.success = false;	
		}
		else if (result.code == 412){
			$scope.message = "La date de validité du ticket à expiré !";
			$scope.success = false;		
		};
	});
}]);
