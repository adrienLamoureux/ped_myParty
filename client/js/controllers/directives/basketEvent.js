// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$scope','User','AddTicketToBasket', '$routeParams', function ($scope, User, AddTicketToBasket, $routeParams){

	getBasketWithUserId = function(){
		User.get({id:$routeParams.id}, function (res, e){
		alert ('getBasket() : SUCCESS');
		console.log(res.basket[0].eventTickets);
		console.log(res.basket[0].eventTickets[0].eventID);
		var tab_tickets = res.basket[0].eventTickets;
		for(i=0;i<tab_tickets.length;i++){
			console.log(tab_tickets[i]);
		}
		}, function (){
			alert ('getBasket() : ERROR');
		})
	}
     
    getBasketWithUserId();
	// Il faut recuperer dans ticketTypeSchema : description, price a l aide du ticketTypeNb
	// Il faut recuperer le titre de l'event

	// Parcourir les eventTickets et stocker dans un tableau





	// Methode qui en fonction d'un id event renvoit le nom de l'event ainsi que le prix de ces type de tickets ainsi que leur intitulé (ex: premium). 
	$scope.getPriceAboutTicketTypeEvent = function(){

	}

	//fonction permettant de décrémenter le nombre d'un element du panier
	$scope.decrement = function(){
		alert("decrement");
		$scope.number = $scope.number-1;
	}

	//fonction permettant d'incémenter le nombre d'un element du panier, en prenant soin de checker si il est possible 
	//de commander un element supplémentaire (nombre de place maximal non atteint)
	$scope.increment = function(){
		alert("increment");
		$scope.number = $scope.number+1;
	}

	//fonction permettant de recalculer le cout du montant d'un element en fonction du prix et du nombre commander
	$scope.recalculateElement = function(){
		
	}

	//fonction permettant de recalculer le total
	$scope.recalculateTotal = function(){
		
	}

	//fonction permettant de supprimer un element du panier. Demander si l'utilisateur est sur de vouloir le supprimer
	$scope.deleteElement = function(){
		
	}

	//fonction permettant de valider mon panier et passer à son achat
	$scope.validateBasket = function(){
		
	}
	

}]);