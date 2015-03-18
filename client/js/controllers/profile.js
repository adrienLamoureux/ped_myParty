// Profile
app.controller('UserCtrl', ['$scope', '$routeParams','$window', '$rootScope', '$timeout','ngProgress', 'User', '$route', '$window', function ($scope, $routeParams, $window, $rootScope, $timeout, ngProgress, User, $route, $window){

	ngProgress.color("#B40404");
	ngProgress.start();
	
	var currentUserId = $rootScope.user.user_id;
	$scope.viewImg = false;		
	$scope.newPrenom = '';


	User.get({id:currentUserId}).$promise.then(function(res){
		$scope.mongoUser =  res;
		ngProgress.complete();
	}, function(err){
		console.log(err)
	});

	$scope.updateProfile = function (){
		User.put({id:currentUserId}, $scope.mongoUser);
		$scope.viewImg = false;
		$window.location.reload();
	};

	UserApp.User.get({
		"user_id" : currentUserId
	}, function(err,res){
		if(err) console.log(err)
		else{
			$scope.create_account = new Date(res[0].created_at*1000);
			$scope.updated_at = new Date(res[0].updated_at*1000);
			$scope.last_login = new Date(res[0].last_login_at*1000);	
			$scope.first_name = res[0].first_name;
			$scope.last_name = res[0].last_name;
			$scope.email = res[0].email;
		}
	});

	$scope.viewImgP = function(){
		$scope.viewImg = true;
	}

	$scope.callAtTimeout = function() {
    }

    $timeout( function(){ $scope.callAtTimeout(); }, 300);

	$scope.lockUsr = function (){
		if(confirm("Etes vous sûr de verrouiller votre Compte ? vous ne pourrez plus vous connecter")){
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
		$timeout( function (){$route.reload()} , 500);
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

