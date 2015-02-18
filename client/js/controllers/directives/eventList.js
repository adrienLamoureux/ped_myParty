// Event List Directive Controller
app.controller('EventListCtrl', ['$scope','Event',  function ($scope, Event){
	
	$scope.events = Event.query();/*.promise.then(function (){
		alert ('Event : Requete SUCCESS !!!');
	}, function (){
		alert ('Event : erreur pendant la requete !!!');
	});*/
}]);