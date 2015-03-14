// Profile
app.controller('UserCtrl', ['$scope', '$routeParams','$window', '$rootScope', '$timeout','ngProgress', 'User', '$route', '$location', function ($scope, $routeParams, $window, $rootScope, $timeout, ngProgress, User, $route, $location){

	ngProgress.color("#B40404");
	ngProgress.start();
	var currentUserId = $rootScope.user.user_id;
	$scope.viewImg = false;		
	$scope.newPrenom = '';

	$scope.mongoUser = User.get({id:currentUserId});

	$scope.updateProfile = function (){
		User.put({id:currentUserId}, $scope.mongoUser);
		$scope.viewImg = false;
	};

	UserApp.User.get({
		"user_id" : currentUserId
	}, function(err,res){
		if(err) console.log(err)
		else{
			$scope.create_account = new Date(res[0].created_at);
			$scope.updated_at = new Date(res[0].updated_at);
			$scope.last_login = new Date(res[0].last_login_at);	
			$scope.first_name = res[0].first_name;
			$scope.last_name = res[0].last_name;
			$scope.email = res[0].email;
		}
	});

	$scope.viewImgP = function(){
		$scope.viewImg = true;
	}

	$scope.callAtTimeout = function() {
		ngProgress.complete()
        //console.log("$scope.callAtTimeout - Timeout occurred");
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

	$scope.reloadPage = function(){
		$location.path("/usr");
		$timeout( function (){$route.reload()} , 1000);
	}


	$scope.validateChange = function(newName){
		if(newName){
		 UserApp.User.save({
		    "user_id": currentUserId,
		    "first_name": newName,
		},function (err, res){
			if(err) console.log(err)
			else {
		//		console.log(res);
			}
		})
		}
		else $scope.errorMsg = true;
	}

	$scope.errorMsg = false;
}]);

