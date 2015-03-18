// HomePage Controller
app.controller('HomeCtrl', ['$scope', 'ngProgress', 'User', '$rootScope', 'Command', function ($scope, ngProgress, User, $rootScope, Command){

	ngProgress.color("#B40404");
	
	var currentUserId = $rootScope.user.user_id;
	console.log(currentUserId);


	$scope.deleteUser = function(){
		User.remove({id : currentUserId},function(succes){
			console.log(succes)
		}, function(failed){
			console.log(failed);
		});
	}
}]);