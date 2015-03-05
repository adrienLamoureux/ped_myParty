// NavigationBar Controller
app.controller('NavigationCtrl', ['$scope', function ($scope){
	$scope.activeMenu=0;

	// change Menu state
    $scope.changeActiveMenu = function(id) {
    	$scope.activeMenu=id;
   	};
}]);