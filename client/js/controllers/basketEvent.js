// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$rootScope', '$scope', 'User','Event', 'Command', 'Ticket', '$routeParams', 'ngProgress', '$timeout', '$location', '$q', 'Notification', function ($rootScope, $scope, User, Event, Command, Ticket, $routeParams, ngProgress, $timeout, $location, $q, Notification){

	ngProgress.color("#B40404");
	ngProgress.start();

	$scope.basketOfUser = [];
	$scope.AllTicketsValid = true;
	$scope.inValidation=false;

	function getBasketWithUserId(){
		$scope.theUser = User.get({id:$rootScope.user.user_id}, function (res, e){
		// On test si il un panier est deja associé au User et si il contient deja des articles
		if(typeof(res.basket) != 'undefined' && res.basket.length > 0){
			// Si oui alors on recupere les datas
			for(i=0;i<res.basket.length;i++){
				$scope.basketOfUser.push(res.basket[i]);
			}
		}else{
			//console.log("Panier vide");
		}
		checkDisponibilityOfBasketTickets(res.basket);
		$scope.totalOfBasket = calculateTotal();
		
		ngProgress.complete();
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
	};

	function checkDisponibilityOfBasketTickets(basket){
		// On recupere le panier utilisateur et on le parcours
		for(i=0;i<basket.length;i++){
			var eventID = basket[i].eventID;
			// On parcours les tickets de l'evenement
			for(j=0;j<basket[i].tickets.length;j++){
				// On recupere le type de ticket et son nombre
				var titleTicket = basket[i].tickets[j].entitled;
				var typeTicketNumber = basket[i].tickets[j].nbTicket
				// Et on check en base si le tickets et bien disponible
				basket = checkValidityOfATicket(basket,i,j,eventID,typeTicketNumber,titleTicket);
			}
		}
	}

	function checkValidityOfATicket(basket, i, j, eventID, typeTicketNumber, titleTicket){
		var thisEvent = Event.get({id:eventID}, function(data){
		thisEvent = data;	
		for(k=0;k<thisEvent.ticketsType.length;k++){
				if(titleTicket == thisEvent.ticketsType[k].type){
					if(thisEvent.ticketsType[k].ticketLeft >= typeTicketNumber){
					basket[i].tickets[j].disponibility = "Oui";
					$scope.AllTicketsValid = true;
					}else{
					basket[i].tickets[j].disponibility = "Non";
					$scope.AllTicketsValid = false;
					}
				}
			}

		});
		return basket;
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
				$scope.totalOfBasket = calculateTotal();
				$scope.basketOfUser = $scope.theUser.basket;
				checkDisponibilityOfBasketTickets($scope.basketOfUser);
			}, function (){
				//console.log('Mise a jour du panier panier : ERREUR');
			});
		}else{
			//$scope.deleteElement(eventid, type, nomTicket);
		}
	}

	// Fonction permettant d'incrémenter le nombre d'un element du panier
	$scope.increment = function(eventid, type, qtty, ticket, nomTicket){

		var max = false;

		Event.get({id:eventid}, function(data){
		for(j=0;j<data.ticketsType.length;j++){
			if(data.ticketsType[j].uniqueID == type){
				if(data.ticketsType[j].ticketLeft <= qtty){
				max = true;
				}
			}
		}
		if(max == false){
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
				$scope.totalOfBasket = calculateTotal();
				$scope.basketOfUser = $scope.theUser.basket;
				checkDisponibilityOfBasketTickets($scope.basketOfUser);
			}, function (){
				alert("Il ne rester qu'un ticket de ce type, veuillez le supprimer.")
			});
		}
		});
	};

	// Fonction permettant de supprimer un element du panier. Demander si l'utilisateur est sur de vouloir le supprimer
	$scope.deleteElement = function(eventid, typeTicket, nomTicket){
		//alert("Voulez vous réelement supprimer le(s) ticket(s) \""+nomTicket+"\" ?");
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
			$scope.totalOfBasket = calculateTotal();
			$scope.basketOfUser = $scope.theUser.basket;
		}, function (){
			alert ('Mise a jour du panier panier : ERREUR');
		});
	}

	/* Gestion de la validation du panier */
	$scope.userCmd = null;
	$scope.completeEvent = {};

	var createCmd= function (evnt, mongoTicket){
		var promises = [];

		angular.forEach($scope.userCmd.eventTickets, function (evTicket, key){
			var deferred = $q.defer();
			promises.push (deferred);
			if (evTicket.eventID == evnt.eventID){
				evTicket.tickets.push(mongoTicket._id);
			}
			deferred.resolve($scope.userCmd)
		});

		return $q.all(promises);
	};

	var createTicket = function (evnt, ticket, keyforEvent){
		var promises = [];

		var tckt = {
			'userID': $rootScope.user.user_id,
			'ownerID': $scope.completeEvent[keyforEvent].ownerID,
			'eventID': $scope.completeEvent[keyforEvent]._id,
			'ticketTypeID': ticket.ticketType,
			'expirationDate': new Date(ticket.expirationDate).getTime(),
			'used':false,
			'canceled': false
		};

		for(i=0; i<ticket.nbTicket; i++) {
			var deferred = $q.defer();
			promises.push(deferred);

			var mongoTicket = Ticket.post(tckt, function (ticketData){
				mongoTicket = ticketData;
				
				$scope.completeEvent[keyforEvent].tickets.push(mongoTicket._id);
				Event.put({id:$scope.completeEvent[keyforEvent]._id}, $scope.completeEvent[keyforEvent]);

				// création commande
				createCmd(evnt, mongoTicket).then(function (){
					$timeout (function (){
						$scope.userCmd = Command.put({id:$scope.userCmd._id}, $scope.userCmd, function (dataCmd){
							$scope.userCmd = dataCmd;
						}, function (err){
							$scope.inValidation=false;
						});
					}, 1500);
				})
				deferred.resolve($scope.userCmd);
			}, function (err){
				$scope.inValidation=false;
				deferred.reject("erreur pendant la creation d'une commande !!");
			});
		}

		return $q.all(promises);
	};

	var createTicketForType = function (evnt, ticket, keyforEvent) {
		var promises = [];

		angular.forEach($scope.completeEvent[keyforEvent].ticketsType, function (tType, key3){
			var deferred = $q.defer();
			promises.push (deferred);
						
			if (tType.uniqueID == ticket.ticketType){
				if (tType.ticketLeft >= ticket.nbTicket){											
					tType.ticketLeft -= ticket.nbTicket;
					tType.sold += ticket.nbTicket;

					$scope.completeEvent[keyforEvent] = Event.put({id:$scope.completeEvent[keyforEvent]._id}, $scope.completeEvent[keyforEvent], function (evUp){
						$scope.completeEvent[keyforEvent] = evUp;											
						
						createTicket(evnt, ticket, keyforEvent).then(function(data){
							$timeout (function (){
								deferred.resolve("Billet crée et collections updated");
							}, 1000);
						});
					});
				}
				else {
					$scope.inValidation=false;
					deferred.reject("nombre de billets non dispo à la vente");
					alert("Le nombre de billets souhaité n'est plus dispo à la vente, veuillez retenter votre achat ultérieurement. Merci de votre compréhension.");
				};
			}
			else {
				deferred.reject("OK mais pas bon type ticket");
			};
		});
		return $q.all(promises);
	}

	var createTicketsForEvents = function (evnt, keyforEvent){
		var promises = [];
				
		angular.forEach(evnt.tickets, function(ticket, key2){
			var deferred = $q.defer();
			promises.push (deferred);
			
			createTicketForType(evnt, ticket, keyforEvent).then (function (){
				$timeout(function (){
					deferred.resolve();
				}, 1000);
			});
		});
		return $q.all(promises);
	}

	$scope.submitBasket = function(){
		$scope.inValidation=true;
		if($scope.AllTicketsValid == true) {
			ngProgress.start();

			var cptTicket = 0 ;
			
			var newCmd = {
				'dateBuy': Date.now(),
				'totalAmount': $scope.totalOfBasket,
				'eventTickets':[],
				'canceled': false
			};

			$scope.userCmd = Command.post(newCmd, function (cmd){
				$scope.userCmd = cmd;

				var mongoUser = User.get({id:$scope.theUser.apiID}, function(userData) {
					mongoUser = userData;

					mongoUser.commandsID.push($scope.userCmd._id);

					mongoUser = User.put({id:mongoUser.apiID}, mongoUser, function (userData2){
						mongoUser = userData2;
						angular.forEach($scope.basketOfUser, function (evnt, keyforEvent){
							$scope.completeEvent[keyforEvent] = Event.get({id:evnt.eventID}, function (evn){
								$scope.completeEvent[keyforEvent] = evn;
								$scope.userCmd.eventTickets.push({
									'eventID': evnt.eventID,
									'tickets':[]
								});
								
								
								createTicketsForEvents(evnt, keyforEvent).then (function () {
									$timeout( function(){ 
										$scope.basketOfUser = [];
										mongoUser.basket = $scope.basketOfUser;
										mongoUser = User.put({id:$rootScope.user.user_id}, mongoUser, function (res){
											ngProgress.complete();
											mongoUser = res;
											$location.path('/payment/' + $scope.userCmd._id);
										}, function (err){

											$scope.inValidation=false;
											//console.log(err);
										});																
									}, 1000);	
								});
							}, function (err){
								$scope.inValidation=false;
								//console.log (err);
							});
						});
					});
				});
			}, function (err){
				$scope.inValidation=false;
				//console.log(err);
			});
		}else{
			$scope.inValidation=false;
			alert("Impossible de commander, des tickets sont en quantité insuffisante. Veuillez changer votre commande.")
		}
	};

	var notification3Sec = function(text, notifTitle) {
		Notification.success({message: text, delay: 3000, title: '<i>'+notifTitle+'</i>'});
	};

	// Fonctions lancées lors de l'execution du controleur 
	getBasketWithUserId();

}]);
