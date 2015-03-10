// User Events
app.controller('UserCtrl', ['$scope', '$routeParams','$window', function ($scope, $routeParams, $window){


	$scope.lockUsr = function (usr){
		console.log("usr" + usr.user_id)
		UserApp.User.lock({
			"user_id" : usr.user_id,
			"type" : "",
			"reason" : "AutoLock"
		}, function(err, res){
			if(err) console.log(error)
			console.log(res)
		});
	};
	
}]);