//EventController
app.controller('EventCtrl', ['$rootScope','$scope', '$routeParams', 'Event', 'EventImages','User', '$window', 'Notification', 'ngProgress', function ($rootScope, $scope, $routeParams, Event, EventImages, User, $window, Notification, ngProgress){
	ngProgress.color("#B40404");

	$scope.showTicket = false;
	$scope.canceledEvent = false;
	$scope.loading = true;
	$scope.publishing = false;

	//URL event argument
	if(angular.isDefined($routeParams.id)){
		ngProgress.start();
		$scope.thisEvent = Event.get({id:$routeParams.id}, function(data){
			$scope.thisEvent = data;	
			ngProgress.complete();	
		});
		$scope.imgs = EventImages.get({id:$routeParams.id}, function(data){
			$scope.loading = false;
			$scope.imgs = data;
		});			
	}

	// if not event => $scope.thisEvent = undefined
	$scope.places_number = 1;
	$scope.Myuser = null;

	$scope.addToBasket = function(numberplace, ticketType, ticketPrice, ticketDescription, ticketleft, expirationDate, eventTitle){
		
		var addOrNot = false;

		// On commence par regarder si le ticket type de cet evenement est bien disponible
		if(ticketleft < numberplace){
			if(ticketleft == 0){
				alert("Désolé, il ne reste plus de billet de ce type pour cet evenement");
			}else{
				alert("Désolé, il ne reste plus que "+ticketleft+" billets de ce type pour cet evenement");
			}
		}else{
			if(typeof(numberplace) == "undefined"){
				alert("Merci d'ajouter à votre panier un nombre de ticket valide.");
			}else{
			// Si les tickets sont disponibles on recupere le panier de l'utilisateur
			$scope.Myuser = User.get({id:$rootScope.user.user_id}, function (res){
				var panier = res.basket;
				// Si le panier n'existe pas, on l'initialise à vide
				if(typeof(panier) == "undefined"){
					panier = [];
				}
				// Si le panier contient deja des basketEventTicket
				if(panier.length > 0){
					// Et si il existe un baskentEventTicket avec l'id correspondant a l'event du ticket ajouté
					var exist_in_basket = null;
					for(i=0;i<panier.length;i++){
						if(panier[i].eventID == $routeParams.id){
							exist_in_basket = i;
						}
					}
						if(exist_in_basket != null){
							var i = exist_in_basket;
							// Alors on regarde si le ticket pour cet event correspond au type du ticket ajouté
							var exist_in_event = null;
							for(j=0;j<panier[i].tickets.length;j++){
								// Si oui on incremente son nbTicket
								if(panier[i].tickets[j].ticketType == ticketType){
									exist_in_event = j;
								}
							}
							if(exist_in_event != null){
								var j = exist_in_event;
								// Si oui on incremente son nbTicket si le nb de ticket dispo le permet
								if(panier[i].tickets[j].ticketType == ticketType){
									if(panier[i].tickets[j].nbTicket + numberplace > ticketleft){
									var ticketsNumberMax = ticketleft-panier[i].tickets[j].nbTicket;
										if(ticketsNumberMax == 0){
										alert("Vous possédez déja la quantité maximum des tickets disponibles dans votre panier");
										}else{
										alert("Vous ne pouvez pas ajouter, à votre panier, plus de tickets qu'il n'y en a en vente");
										}
									}else{
									panier[i].tickets[j].nbTicket = panier[i].tickets[j].nbTicket + numberplace;
									addOrNot = true;
									}
								}
								// Dans le cas contraire on ajoute une structure tQuantity
								}else{
									// On créé la structure du nouveau type de ticket pour cet evenement
									var newTQuantity = {
										ticketType: ticketType,
										nbTicket: numberplace,
										price: ticketPrice,
										entitled: ticketDescription,
										expirationDate: expirationDate
									}
									// Et on ajoute ce ticket
									panier[i].tickets.push(newTQuantity);
									addOrNot = true;
									}
								
							}else{
								// Si il n'existe pas ticket de ce type d'evenement dans le panier, alors on ajoute toute la structure
								var newBasketEventTicket = {
									eventID: $routeParams.id,
									eventTitle: eventTitle,
									tickets: [{
										ticketType: ticketType,
										nbTicket: numberplace,
										price: ticketPrice,
										entitled: ticketDescription,
										expirationDate: expirationDate
									}]
								}
								panier.push(newBasketEventTicket);
								addOrNot = true;
							}
						
				}else{
					var newBasketEventTicket = {
						eventID: $routeParams.id,
						eventTitle: eventTitle,
						tickets: [{
							ticketType: ticketType,
							nbTicket: numberplace,
							price: ticketPrice,
							entitled: ticketDescription, 
							expirationDate: expirationDate
						}]
					};
					panier.push(newBasketEventTicket);
					addOrNot = true;
				}
				$scope.Myuser.basket = panier;	
				// Et maintenant on met a jour les donnees en base
					User.put({id:$rootScope.user.user_id}, $scope.Myuser, function (res2, e){
						//numberplace, ticketType, ticketPrice, ticketDescription, ticketleft, expirationDate, eventTitle
						if(numberplace == 1) {
							// Affichage de la notification d'ajout au panier
							if(addOrNot == true){
							notification2Sec("Ajout d'un billet au panier !", eventTitle);
							}
						}else{
							if(addOrNot == true){
							notification2Sec('Ajout de '+numberplace+' billet au panier !', eventTitle);
							}
						}
						
					}, function (){
						console.log("Erreur lors de l'update du USER et son nouveau panier");
					});

			}, function (){
				console.log("Probleme lors de l'ajout du billet, erreur lors de la recuperation du panier utilisateur");
			});
			}
		}
	};

	$scope.dateNotExpired=function(date){
		return Date.parse(date)>Date.now();
	};

	notification2Sec = function(text, eventTitle) {
		Notification.success({message: text, delay: 2000, title: '<i>'+eventTitle+'</i>'});
	};

}]);