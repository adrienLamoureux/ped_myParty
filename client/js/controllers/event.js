//EventController
app.controller('EventCtrl', ['$scope', '$routeParams', 'Event','User','AddTicketToBasket', function ($scope, $routeParams, Event, User, AddTicketToBasket){

	//URL event argument
	if(angular.isDefined($routeParams.id)){
		$scope.thisEvent = Event.get({id:$routeParams.id});
	}

	// if not event => $scope.thisEvent = undefined
	$scope.places_number = 1;

	$scope.addToBasket = function(numberplace, ticketid, ticketleft){
		alert("ajout au panier de : "+numberplace+" tickets de l'eventid : "+$routeParams.id+" de du ticket type id: "+ticketid);
		// On commence par regarder si le ticket type de cet evenement est bien disponible
		if(ticketleft < numberplace){
			if(ticketleft == 0){
				alert("Désolé, il ne reste plus de billet de ce type pour cet evenement");
			}else{
				alert("Désolé, il ne reste plus que "+ticketleft+" billets de ce type pour cet evenement");
			}
		}else{
		// Comme les fonctionnalités du user ne sont pas en place, on utilise un id en dur pour le moment
		var $id_user = "54f723907bedeb041a3cf0b7";
		// On recupere le panier de l'utilisateur
		User.get({id:$id_user}, function (res, e){
			var Newbasket = res.basket;
		// On check si il existe deja un panier
		if(Newbasket.length == 0){
			//Dans le cas contraire on créé un panier
			Newbasket[0] = {
				eventTickets: [],
				dateBuy: null
			}
		}
		console.log(Newbasket);

		// Est-ce qu'il a deja des reservations de ticket pour cet evenement:
		var EventExist = false;
		if(Newbasket[0].eventTickets.length != 0){
			for(i=0;i < Newbasket[0].eventTickets.length;i++){
				if(Newbasket[0].eventTickets[i].eventID == $routeParams.id){
					console.log(Newbasket[0].eventTickets[i].eventID)
					EventExist = true;
				}
			}	
		}

		if(EventExist == false){
			alert("ajout evenement")
			var newEvent =
			{
				eventID: $routeParams.id,
				tickets: []
			}
			// Alors on ajoute l'evenement
			Newbasket[0].eventTickets.push(newEvent);
		}

		console.log(Newbasket);
	// Maintenant il faut ajouter les tickets à l'evenement
	for(i=0;i<Newbasket[0].eventTickets.length;i++){
		if(Newbasket[0].eventTickets[i].eventID == $routeParams.id){
			for(j=0;j<numberplace;j++){
				var newTicket = {
					uniqueID: null,
					userID: $id_user,
					ticketTypeNb: ticketid,
					used: false
				}
				Newbasket[0].eventTickets[i].tickets.push(newTicket);
			}
		}
	}
	var clientWhithNewBasket = res;
	clientWhithNewBasket.basket = Newbasket;
	console.log(clientWhithNewBasket);

	// Et maintenant on update le panier
	AddTicketToBasket.update({id:$id_user}, clientWhithNewBasket, function (res, e){
		alert ('putTicketInBasket() : SUCCESS');
	}, function (){
		alert ('putTicketInBasket() : ERROR');
	});


}, function (){
	alert ('getBasket() : ERROR');
})
}

}

}]);