// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$rootScope', '$scope', 'User','Event', 'Command', 'Ticket', '$routeParams', function ($rootScope, $scope, User, Event, Command, Ticket, $routeParams){

	$scope.basketOfUser = [];

	function getBasketWithUserId() {
		$scope.theUser = User.get({id:$rootScope.user.user_id}, function (res, e){
			//console.log('Récuperation de l\'utilisateur réussie :'+$scope.theUser.apiID);
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
			console.log('Récuperation de l\'utilisateur échoué');
			console.log(e);
		});
	}

	// Fonction permettant de recalculer le total
	function calculateTotal(){
		var total = 0;

		if($scope.basketOfUser.length > 0) {
			for(i=0;i<$scope.basketOfUser.length;i++){
				for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
					total = total + $scope.basketOfUser[i].tickets[j].price * $scope.basketOfUser[i].tickets[j].nbTicket;
				}
			}
		}
		return total;
	};

	// Fonction permettant de décrémenter le nombre d'un element du panier
	$scope.decrement = function(eventid, type, qtty, ticket){
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
			}, function (){
				console.log('Mise a jour du panier panier : ERREUR');
			});
		}else{
			alert("Il ne rester qu'un ticket de ce type, veuillez le supprimer.")
		}
	};

	// Fonction permettant d'incrémenter' le nombre d'un element du panier
	$scope.increment = function(eventid, type, qtty, ticket){
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
			ticket.nbTicket++;
			$scope.$parent.totalOfBasket = calculateTotal();
		}, function (){
			alert("Il ne rester qu'un ticket de ce type, veuillez le supprimer.")
		});
	};

	// Fonction permettant de supprimer un element du panier. Demander si l'utilisateur est sur de vouloir le supprimer
	$scope.deleteElement = function(eventid, typeTicket, nomTicket){
		alert("Voulez vous réelement supprimer le(s) ticket(s) \""+nomTicket+"\" ?");
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
			window.location.reload();
		}, function (){
			alert ('Mise a jour du panier panier : ERREUR');
			console.log(res);
			console.log(e);
		});
	}

	// Fonctions lancées lors de l'execution du controleur 
	getBasketWithUserId();

	$scope.submitBasket = function(){
		var newCmd = {
			'dateBuy': Date.now(),
			'eventTickets':[]
		};

		var userCmd = Command.post(newCmd, function (cmd){
			userCmd = cmd;

			var mongoUser = User.get({id:$scope.theUser.apiID}, function(userData) {
				mongoUser = userData;

				mongoUser.commandsID.push(userCmd._id);

				mongoUser = User.put({id:mongoUser.apiID}, mongoUser, function (userData2){
					mongoUser = userData2;
					angular.forEach($scope.basketOfUser, function (evnt, key1){
						var completeEvent = Event.get({id:evnt.eventID}, function (evn){
							completeEvent = evn;
							userCmd.eventTickets.push({
								'eventID': evnt.eventID,
								'tickets':[]
							});
							
							angular.forEach(evnt.tickets, function(ticket, key2){
								angular.forEach(completeEvent.ticketsType, function (tType, key3){
											
									if (tType.uniqueID == ticket.ticketType){
										if (tType.ticketLeft >= ticket.nbTicket){											
											tType.ticketLeft -= ticket.nbTicket;
											tType.sold += ticket.nbTicket;
			
											var eventUp = Event.put({id:completeEvent._id}, completeEvent, function (evUp){
												eventUp = evUp;											
												var tckt = {
													'userID': $rootScope.user.user_id,
													'eventID': evnt.eventID,
													'ticketTypeID': ticket.ticketType,
													'expirationDate': new Date(ticket.expirationDate).getTime(),
													'used':false
												};
												for(i=0;i<ticket.nbTicket;i++) {
													var mongoTicket = Ticket.post(tckt, function (ticketData){
														mongoTicket = ticketData;
														completeEvent.tickets.push(mongoTicket._id);
														Event.put({id:completeEvent._id}, completeEvent, function (data){
															$scope.evnt = completeEvent;
														}, function (err){
															console.log(err);
														});

														angular.forEach(userCmd.eventTickets, function (evTicket, key){
															if (evTicket.eventID == evnt.eventID){
																evTicket.tickets.push(mongoTicket._id);
																userCmd = Command.put({id:userCmd._id}, userCmd, function (dataCmd){
																	userCmd = dataCmd;
																}, function (err){
																	console.log(err);
																});
															}
														});

													}, function (err){
														console.log(err);
													});
												}
											});
										}
										else {
											alert("Le nombre de billets souhaité n'est plus dispo à la vente, veuillez retenter votre achat ultérieurement. Merci de votre compréhension.");
										}	
									}
								});
							});
						}, function (err){
							console.log (err);
						});
						$scope.evnt = completeEvent;
					});
					$scope.cmdss = userCmd;
				});
			});
		}, function (err){
			console.log(err);
		});
	};
}]);
