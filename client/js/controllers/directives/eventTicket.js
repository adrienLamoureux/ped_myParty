app.controller('EventTicketCtrl', ['$scope', '$routeParams', function ($scope, $routeParams){
	var urlDeploy = "";
	$scope.qrcode = urlDeploy+"#/event/"+$routeParams.id+"/ticket/"+$routeParams.idt+"/validate";
	console.log($scope.qrcode);
}]);