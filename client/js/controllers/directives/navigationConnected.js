// NavigationBar Controller
app.controller('NavigationConnectedCtrl', ['$scope', '$rootScope', '$timeout', 'User', function ($scope, $rootScope, $timeout, User){

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
                              
}]);