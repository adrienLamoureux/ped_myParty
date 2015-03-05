//EventController
app.controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', function ($rootScope, $scope, $routeParams){
	
	$scope.user = {
		user_id : "swiPjk21RqmEPu21KVi84w"
	}

	$scope.connected = function(){
		$rootScope.user = $scope.user;
	}
	
	
}]);