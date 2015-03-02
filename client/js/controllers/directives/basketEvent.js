// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$scope','BasketWithUserId','AddTicketToBasket', '$routeParams', function ($scope, BasketWithUserId, AddTicketToBasket, $routeParams){

/*
	$scope.user = {
		email: 'mail',
		password: 'motdepassedemerde',
		name: 'Pagnol',
		firstName: 'Marcel',
		phoneNumber: '048596754215',
		inscriptionDate: '2014-02-19T09:47:50.481Z',
		eventsID: null,//[{type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'}],
		commandsID: null,//{type: mongoose.Schema.Types.ObjectId, ref:'commandsModel'},
		basket : [
		{	
			eventTickets: [
			{
				eventID: 0,
				tickets: [
				{
					uniqueID: 1,
					userID: 999,
					ticketTypeNb: 3,
					used: false
				},
				{
					uniqueID: 2,
					userID: 9999,
					ticketTypeNb: 1,
					used: false
				}
				],
				dateBuy: null
			},
			{
				eventID: 777,
				tickets: [
				{
					uniqueID: 1,
					userID: 777,
					ticketTypeNb: 3,
					used: false
				}
				],
				dateBuy: null
			}
			]
		}
		]
	};
	*/

	$scope.usernew = {
		email: 'xxxx@xxxx',
		password: 'xxxxx',
		name: 'xxxxxxx',
		firstName: 'xxxxxx',
		phoneNumber: 'xxxx',
		inscriptionDate: '1424339270481',
		eventsID: [],
		commandsID: null,
		basket : [		{	
			eventTickets: [
			{
				eventID:0,
				tickets: [
				{
					uniqueID: 1,
					userID: null,
					ticketTypeNb: 3,
					used: false
				},
				{
					uniqueID: 2,
					userID: null,
					ticketTypeNb: 1,
					used: false
				}
				]
			},
			{	
				eventID:1,
				tickets: [
				{
					uniqueID: 3,
					userID: null,
					ticketTypeNb: 3,
					used: false
				}
				]
			}
			],
			dateBuy: null
		}]
	};


	getBasketWithUserId = function(){
		$scope.user = BasketWithUserId.get({id:$routeParams.id}, function (e, res){
		alert ('getBasket() : SUCCESS');
		console.log($scope.user);
		return $scope.user;
		}, function (){
			alert ('getBasket() : ERROR');
		})
	}
	$scope.number= 0;
	getBasketWithUserId();

	// Ajout de tickets au panier. Necessite en parametre : l'id de l'event , le numero du type de billet.
	$scope.ajoutpanier = function() {
	alert("Tentative d'ajout d'un ticket, event : "+$scope.event_id+" type_ticket : "+$scope.type_ticket);
	// Checker si il existe deja des billets associés a cet event  dans ce panier.
	getBasketWithUserId(function(){
		alert("YOYO");
	});
	// Si oui : Checker si il existe deja des billets du type associé
	// Si oui : +1 Si non: créer l'element
	// Ne pas oublier de decrementer le nombre de ticketstype de l'event
	// Puis mettre a jour les donnees :
	AddTicketToBasket.update({id:$routeParams.id}, $scope.usernew, function (e, res){
		alert ('putTicketInBasket() : SUCCESS');
	}, function (){
		alert ('putTicketInBasket() : ERROR');
	});
	}


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