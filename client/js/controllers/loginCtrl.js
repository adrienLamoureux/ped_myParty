// HomePage Controller
app.controller('LoginCtrl', ['$scope', 'ngProgress', 'User', 'Command','$q','$window', '$timeout', function ($scope, ngProgress, User, Command, $q, $window, $timeout){

	ngProgress.color("#B40404");

$scope.unlockUser = function(log, pass, idLock){
	UserApp.User.login({
		"login": "vergil1534@gmail.com",
		"password": "password"
	},function(err, res){
	if(err) console.log(err)
	UserApp.User.get({
		"user_id": res.user_id
		},function(err, res){
			if(err) console.log(err)
			else{
				UserApp.User.unlock({
					"user_id" : idLock,
					"type" : "ACCOUNT_EXPIRED"
				}, function(err, res){
					if(err) console.log(err)
					else console.log(res);
				});
		}})
	})
	$scope.showUnlockButton = false;
}

	$scope.createUser = function (log, pass) {
		var deferred = $q.defer();

		ngProgress.start();
		UserApp.User.login({
			"login" : log,
			"password" : pass
		}, function(err, res){
			if(err) console.log(err);
			else{
				if(res.locks.length){
					$scope.showUnlockButton = true;
					$scope.idLock = res.user_id;
					ngProgress.complete();
				}
				else{
				var currentUserId = res.user_id;
				User.get({id : currentUserId})
					.$promise
					.then(function(success){
						if(success.apiID && success.apiID === currentUserId){
							ngProgress.complete();
							return $q.reject( 'Rejecting this promise');
						}
					})
					.then(function(res){
						var user = {
							"apiID" : currentUserId,
							"photo" : {
								"filesize":12509,
								"filename":"profile.png",
								"filetype":"image/png"
							},
							"commandsID": [],
							"eventsID": [],
							"basket": []
						};
						return User.post(user);
					})

					.then(function(success){
						ngProgress.complete();
						$window.location.href = '#/';
						$timeout( function(){ 
							$window.location.reload();
						}, 700);				
					})
					.catch(function(failed){
						$window.location.href = '#/';
						$timeout( function(){ 
							$window.location.reload();
						}, 700);			
					});
			}
		}});
	};
}]);


	    
