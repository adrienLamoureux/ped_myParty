//EventController
app.controller('LoginCtrl', ['$location', '$rootScope', '$scope', '$routeParams', function ($location, $rootScope, $scope, $routeParams){
	
	$rootScope.user = {
		user_id : "swiPjk21RqmEPu21KVi84w",
		authenticated : null
	}

	$scope.connected = function(){
		$rootScope.user.authenticated=true;
		$location.path('#/');
	}
	
	
}]);