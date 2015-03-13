// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$rootScope', '$scope', 'User','Event', '$routeParams', function ($rootScope, $scope, User, Event, $routeParams){

	$scope.basketOfUser = [];
	console.log($rootScope.user)

	function getBasketWithUserId() {
		$scope.theUser = User.get({id:$rootScope.user.user_id}, function (res, e){
			console.log('Récuperation de l\'utilisateur réussie :'+$scope.theUser.apiID);
			console.log(res);
		// On test si il un panier est deja associé au User et si il contient deja des articles
		if(typeof(res.basket) != 'undefined' && res.basket.length > 0){
			// Si oui alors on recupere les datas
			for(i=0;i<res.basket.length;i++){
				$scope.basketOfUser.push(res.basket[i]);
			}
			console.log($scope.basketOfUser);
		}else{
			console.log("Panier vide");
		}
		$scope.totalOfBasket = calculateTotal();
	}, function (){
		console.log('Récuperation de l\'utilisateur échoué');
		console.log(e);
	})
	}

	//fonction permettant de recalculer le total
	function calculateTotal(){
		var total = 0;
		console.log($scope.basketOfUser)
		if($scope.basketOfUser.length > 0) {
			for(i=0;i<$scope.basketOfUser.length;i++){
				for(j=0;j<$scope.basketOfUser[i].tickets.length;j++){
					total = total + $scope.basketOfUser[i].tickets[j].price * $scope.basketOfUser[i].tickets[j].nbTicket;
				}
			}
		}
		console.log(total);
		return total;
	}




// Fonctions lancées lors de l'execution du controleur 
getBasketWithUserId();
}]);



/*
	// Tableau stockant les infos pour l'affichage du panier.
	$scope.basketUser = {basket: []};
	$scope.user = null;

	function getBasketWithUserId (){
		$scope.tabGrand = [];
		$scope.user = User.get({id:$rootScope.user.user_id}, function (res, e){
		console.log(res);

		// Si on a un retour :
		if(typeof(res.basket) != "undefined") {
			var tab_tickets = res.basket[0].eventTickets;
			console.log(res.basket[0].eventTickets)
		// Pour chaque event, on va afficher les tickets associés dans le panier dans une section apropriée
		for(i=0;i<tab_tickets.length;i++){
			// Tableau dans lequel on va stocker le TicketTypeNb de l'event ainsi que le nombre que l'utilisateur a stocké dans son panier.
			var tabTicketTypeNb = [];
			for(j=0;j<tab_tickets[i].tickets.length;j++){
				var alreadyExist = false;
				for(k=0;k<tabTicketTypeNb.length;k++){						
				// Si le ticketTypeNb est deja dans le tableau on marque la var alreadyExist a true
				if(tab_tickets[i].tickets[j].ticketTypeNb == tabTicketTypeNb[k].type){
					alreadyExist = true;
				}
			} // Du coup si already exist = true on incremente juste le nombre de billet du panier
			if(alreadyExist == true){
				for(k=0;k<tabTicketTypeNb.length;k++){
					if(tabTicketTypeNb[k].type == tab_tickets[i].tickets[j].ticketTypeNb){
						tabTicketTypeNb[k].nb++;
					}
				}
		    // Sinon on créé un nouveau type de ticket
			}else{
				var obj = {type:tab_tickets[i].tickets[j].ticketTypeNb, nb:1};
				tabTicketTypeNb.push(obj)
			}
		}

		$scope.tabGrand.push(tabTicketTypeNb);
		$scope.repere = 0;

		Event.get({id:tab_tickets[i].eventID}, function (res, e){
			// On recupere les infos des ticketstype appartant a un event ainsi que son titre de manière a pouvoir afficher les infos pertinentes du panier.
			var ticketsTab = [];
			// res.ticketsType = types de levenement
			for(m=0;m<$scope.tabGrand[$scope.repere].length;m++){
				for(l=0;l<res.ticketsType.length;l++){
					if(res.ticketsType[l].uniqueID == $scope.tabGrand[$scope.repere][m].type){
						var ticket = {
							ticketType:res.ticketsType[l].uniqueID,
							price:res.ticketsType[l].price,
							type:res.ticketsType[l].type,
							quantity:$scope.tabGrand[$scope.repere][m].nb
						}
						ticketsTab.push(ticket);
					}
				}
				var anEvent = {
					eventID: res._id,
					eventTitle: res.title,
					tickets: ticketsTab
				}
			}
			$scope.repere++;
			$scope.basketUser.basket.push(anEvent);
		})

	}
}else{
	alert("Panier vide");
}
}, function (){
	alert ('getBasket() : ERROR');
})
}

	//fonction permettant de décrémenter le nombre d'un element du panier
	$scope.decrement = function(eventid,type,qtty){
		alert("DECREMENTER:"+eventid+" "+type+" "+qtty)
		if(qtty > 1){
			for(i=0;i<$scope.user.basket[0].eventTickets.length;i++){
				if($scope.user.basket[0].eventTickets[i].eventID == eventid){
					for(j=0;j<$scope.user.basket[0].eventTickets[i].tickets.length;j++){
						if($scope.user.basket[0].eventTickets[i].tickets[j].ticketTypeNb == type){
							$scope.user.basket[0].eventTickets[i].tickets.splice(j,1);
							j = $scope.user.basket[0].eventTickets[i].tickets.length;
						}
					}
				}
			}
				// On update le panier
				User.update({id:$rootScope.user.user_id}, $scope.user, function (res, e){
				}, function (){
					alert ('Mise a jour du panier panier : ERREUR');
				});
				
			}else{
				// Rien ne se passe, on ne decremente pas 1
			}
		 //qtty--;
		}

	//fonction permettant d'incémenter le nombre d'un element du panier, en prenant soin de checker si il est possible 
	//de commander un element supplémentaire (nombre de place maximal non atteint)
	$scope.increment = function(eventid,type,qtty){
		alert("INCREMENTER:"+eventid+" "+type+" "+qtty)
		for(i=0;i<$scope.user.basket[0].eventTickets.length;i++){
			if($scope.user.basket[0].eventTickets[i].eventID == eventid){
				var newticket = {
					"uniqueID":null,
					"userID":$routeParams.id,
					"ticketTypeNb":type,
					"used":false
				}
				$scope.user.basket[0].eventTickets[i].tickets.push(newticket);
			}

		}
				// On update le panier
				User.update({id:$routeParams.id}, $scope.user, function (res, e){
				}, function (){
					alert ('Mise a jour du panier panier : ERREUR');
				});
				//qtty++;
			}


	//fonction permettant de recalculer le total
	$scope.calculateTotal = function(){
		var total = 1;
		if($scope.basketUser.basket.length > 1) {
		for(i=0;i<$scope.basketUser.basket.length;i++){
			for(j=0;j<$scope.basketUser.basket[i].tickets.length;j++){
				total = total + $scope.basketUser.basket[i].tickets[j].price * $scope.basketUser.basket[i].tickets[j].quantity;
			}
		}
		}
		return total;
	}

	//fonction permettant de supprimer un element du panier. Demander si l'utilisateur est sur de vouloir le supprimer
	$scope.deleteElement = function(eventid,typeTicket,nomTicket){
		alert("Voulez vous réelement supprimer le ticket \""+nomTicket+"\" ?")
		var eventTickets = $scope.user.basket[0].eventTickets;

		// On regarde combien d'event(s) il y a dans le panier.
		var numberOfEvents  = eventTickets.length;

		var tabtemp = [];
		// On parcours le tableau de ticketsEvent
		for(i=0;i<eventTickets.length;i++){
			if(eventTickets[i].eventID == eventid){
				// On parcours les ticketsType de l'event et on stock dans un tableau temporaire les tickets non supprimés
				for(j=0;j<eventTickets[i].tickets.length;j++){
					// Si c'est le ticketType Que l'on souhaite supprimer, alors on suprimme l'element dans le tableau
					if(eventTickets[i].tickets[j].ticketTypeNb != typeTicket){
						tabtemp.push(eventTickets[i].tickets[j]);
					}
				}
				// Puis on remplace par le tabtemp
				$scope.user.basket[0].eventTickets[i].tickets = tabtemp;
			}
		}

		// Si c'etait le dernier type de ticket de l'event, alors on supprime l'event du panier.
		if(tabtemp.length == 0){
			for(i=0;i<eventTickets.length;i++){
				alert("last ticket of event")
				console.log(eventTickets);
				if(eventTickets[i].eventID == eventid){
					eventTickets.splice(i,1);
				}
				console.log(eventTickets);
			}
		}

		// On update le panier
		User.update({id:$rootScope.user.user_id}, $scope.user, function (res, e){
		}, function (){
			alert ('Mise a jour du panier panier : ERREUR');
			console.log(res);
			console.log(e);
		});
	}

	//fonction permettant de valider mon panier et passer à son achat
	$scope.validateBasket = function(){
		alert("Validation panier");
	}

	$scope.reloadRoute = function() {
		window.location.reload();
	}


$scope.calculateTotal();
getBasketWithUserId();
*/
