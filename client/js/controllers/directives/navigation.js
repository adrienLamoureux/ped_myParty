// NavigationBar Controller
app.controller('NavigationCtrl', ['$scope', function ($scope){
	$scope.activeMenu=0;
	
	$scope.userConnected=true; //TODO : gestion de la connexion

	// change Menu state
    $scope.changeActiveMenu = function(id) {
    	$scope.activeMenu=id;
   	};
}]);