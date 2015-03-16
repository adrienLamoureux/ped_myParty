// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$rootScope', '$scope', 'User','Event', '$routeParams', function ($rootScope, $scope, User, Event, $routeParams){

	$scope.basketOfUser = [];

	function getBasketWithUserId() {
		$scope.theUser = User.get({id:$rootScope.user.user_id}, function (res, e){
		// On test si il un panier est deja associé au User et si il contient deja des articles
		if(typeof(res.basket) != 'undefined' && res.basket.length > 0){
			// Si oui alors on recupere les datas
			for(i=0;i<res.basket.length;i++){
				$scope.basketOfUser.push(res.basket[i]);
			}
		}else{
			console.log("Panier vide");
		}
		$scope.totalOfBasket = calculateTotal();
	}, function (){
		//console.log('Récuperation de l\'utilisateur échoué');
	})
	}

	// Fonction permettant de recalculer le total
	function calculateTotal(){
		var total = null;
		if(typeof(total) != undefined) {
			if($scope.basketOfUser.length > 0) {
				for(i=0;i<$scope.basketOfUser.length;i++){
					for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
						total = total + $scope.basketOfUser[i].tickets[j].price * $scope.basketOfUser[i].tickets[j].nbTicket;
					}
				}
			}
		}
		return total;
	}

	// Fonction permettant de décrémenter le nombre d'un element du panier
	$scope.decrement = function(eventid, type, qtty, ticket, nomTicket){
		if(qtty > 1){
			for(i=0;i<$scope.basketOfUser.length;i++){
				if($scope.basketOfUser[i].eventID == eventid){
					for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
						if($scope.basketOfUser[i].tickets[j].ticketType == type){
							$scope.basketOfUser[i].tickets[j].nbTicket--;
						}
					}
				}
			}
			$scope.theUser.basket = $scope.basketOfUser;
			// On update le panier
			User.put({id:$rootScope.user.user_id}, $scope.theUser, function (res, e){
				ticket.nbTicket--;
				$scope.$parent.totalOfBasket = calculateTotal();
				$scope.$parent.basketOfUser = $scope.theUser.basket;
			}, function (){
				//console.log('Mise a jour du panier panier : ERREUR');
			});
		}else{
			$scope.deleteElement(eventid, type, nomTicket);
		}
	}

	// Fonction permettant d'incrémenter le nombre d'un element du panier
	$scope.increment = function(eventid, type, qtty, ticket, nomTicket){
		for(i=0;i<$scope.basketOfUser.length;i++){
			if($scope.basketOfUser[i].eventID == eventid){
				for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
					if($scope.basketOfUser[i].tickets[j].ticketType == type){
						$scope.basketOfUser[i].tickets[j].nbTicket++;
					}
				}
			}
		}
		$scope.theUser.basket = $scope.basketOfUser;
			// On update le panier
			User.put({id:$rootScope.user.user_id}, $scope.theUser, function (res, e){
				console.log(res)
				ticket.nbTicket++;
				$scope.$parent.totalOfBasket = calculateTotal();
				$scope.$parent.basketOfUser = $scope.theUser.basket;
			}, function (){
				alert("Il ne rester qu'un ticket de ce type, veuillez le supprimer.")
			});
		}

	// Fonction permettant de supprimer un element du panier. Demander si l'utilisateur est sur de vouloir le supprimer
	$scope.deleteElement = function(eventid, typeTicket, nomTicket){
		alert("Voulez vous réelement supprimer le(s) ticket(s) \""+nomTicket+"\" ?")
		var tabtemp = [];
		// On parcours le basket
		for(i=0;i<$scope.basketOfUser.length;i++){
			if($scope.basketOfUser[i].eventID == eventid){
				// On parcours les ticketsType de l'event et on stock dans un tableau temporaire les tickets non supprimés
				for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
					// Si c'est le ticketType Que l'on souhaite supprimer, alors on suprimme l'element dans le tableau
					if($scope.basketOfUser[i].tickets[j].ticketType != typeTicket){
						tabtemp.push($scope.basketOfUser[i].tickets[j]);
					}
				}
				// Puis on remplace par le tabtemp
				$scope.theUser.basket[i].tickets = tabtemp;
			}
		}
		// Si c'etait le dernier type de ticket de l'event, alors on supprime l'event du panier.
		if(tabtemp.length == 0){
			for(i=0;i<$scope.basketOfUser.length;i++){
				if($scope.basketOfUser[i].eventID == eventid){
					$scope.basketOfUser.splice(i,1);
				}
				$scope.theUser.basket = $scope.basketOfUser;
			}
		}
		// On update le panier
		User.put({id:$rootScope.user.user_id}, $scope.theUser, function (res, e){
			$scope.$parent.totalOfBasket = calculateTotal();
			$scope.$parent.basketOfUser = $scope.theUser.basket;
		}, function (){
			alert ('Mise a jour du panier panier : ERREUR');
		});
	}


// Fonctions lancées lors de l'execution du controleur 
getBasketWithUserId();

}]);