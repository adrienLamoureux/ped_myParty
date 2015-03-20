// HomePage Controller
app.controller('HomeCtrl', ['$scope', 'User', '$rootScope', 'Command', function ($scope, User, $rootScope, Command){

	var currentUserId = $rootScope.user.user_id;
	
	$scope.deleteUser = function(){
		User.remove({id : currentUserId},function(succes){
			console.log(succes)
		}, function(failed){
			console.log(failed);
		});
	}
}]);