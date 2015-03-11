// User Events
app.controller('UserCtrl', ['$scope', '$routeParams','$window', '$rootScope', '$q', '$timeout','ngProgress', function ($scope, $routeParams, $window, $rootScope, $q, $timeout, ngProgress){

	ngProgress.color("#B40404");
	ngProgress.start();
	var currentUserId = $rootScope.user.user_id;	


	UserApp.User.get({
		"user_id" : currentUserId
	}, function(err,res){
		if(err) console.log(err)
		else{
			$scope.create_account = new Date(res[0].created_at);
			$scope.updated_at = new Date(res[0].updated_at);
			$scope.last_login = new Date(res[0].last_login_at);	
		}
	});

	$scope.callAtTimeout = function() {
		ngProgress.complete()
        console.log("$scope.callAtTimeout - Timeout occurred");
    }

    $timeout( function(){ $scope.callAtTimeout(); }, 300);

	$scope.lockUsr = function (){
		if(confirm("Etes vous sûr de lock votre Compte ? vous ne pourrez plus vous connecter")){
			UserApp.User.lock({
				"user_id" : currentUserId,
				"type" : "ACCOUNT_EXPIRED",
				"reason" : "lock"
			}, function(err, res){
				if(err) console.log(err)
				else console.log(res);
			});
		};
	}



	$scope.validateChange = function(newName){
		UserApp.User.save({
		    "user_id": currentUserId,
		    "first_name": newName,
		},function (err, res){
			if(err) console.log(err)
			else console.log(res);
		});
	};


	
}]);

