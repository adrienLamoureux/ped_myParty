// HomePage Controller
app.controller('HomeCtrl', ['$scope', 'ngProgress', 'User', '$rootScope', function ($scope, ngProgress, User, $rootScope){

	ngProgress.color("#B40404");
	ngProgress.start();
	

	var currentUserId = $rootScope.user.user_id;		

	console.log(currentUserId)
	User.create({id:currentUserId});

	
}]);