// NavigationBar Controller
app.controller('NavigationCtrl', ['$scope', '$rootScope', '$timeout', 'User', function ($scope, $rootScope, $timeout, User){
	$scope.activeMenu=0;
	$scope.activeSubMenu=0;
 
  $scope.mongoUser = null;

  $timeout( function(){ 
    if (angular.isDefined($rootScope.user.user_id)){
      $scope.mongoUser = User.get({id:$rootScope.user.user_id}, function (userData){
        $scope.mongoUser = userData;
      }, function (err){
        console.log(err);
      });
    };
  }, 1500);  
                              
	// change Menu state
    $scope.changeActiveMenu = function(id) {
    	$scope.activeMenu=id;
    	if(id != 5)
    		$scope.activeSubMenu=0;
   	};
   	
    // change SubMenu state
    $scope.changeActiveSubMenu = function(id) {
    	$scope.activeSubMenu=id;
   	};
}]);