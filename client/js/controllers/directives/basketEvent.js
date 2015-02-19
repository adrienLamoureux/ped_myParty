// BasketEvent Directive Controller
app.controller('BasketEventCtrl', ['$scope','BasketWithUserId' function ($scope, BasketWithUserId){

	$scope.basket = {};

	$scope.getBakset = function (){
		$scope.basket = BasketWithUserId.querry().then(function (){
			alert ('getBasket() : SUCCESS');
			console.log($scope.basket);
		}, function (){
			alert ('getBasket() : ERROR');
		});
	};

}]);