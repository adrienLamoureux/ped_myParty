// HomePage Controller
app.controller('LoginCtrl', ['$scope', 'ngProgress', 'User', 'Command','$q', function ($scope, ngProgress, User, Command, $q){

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

		ngProgress.start()
		UserApp.User.login({
			"login" : log,
			"password" : pass
		}, function(err, res){
			if(err) console.log(err)
			else{
				if(res.locks.length){
					$scope.showUnlockButton = true;
					$scope.idLock = res.user_id;
					ngProgress.complete();
				}
				else{
				var currentUserId = res.user_id;
				User.get({id : currentUserId}).$promise.then(function(success){
					if(success.apiID && success.apiID === currentUserId){
						ngProgress.complete()
						return $q.reject( 'Rejecting this promise');
					}}).then(function(res){
						var user = {
							"apiID" : currentUserId,
							"photo" : {
								"base64":"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",
								"filesize":12509,
								"filename":"profile.png",
								"filetype":"image/png"
							},
							"commandsID": []
						};
						return User.post(user);
					}).then(function(success){
						console.log("success to create")
						console.log(success)
						ngProgress.complete()
					}).catch(function(failed){ 
						console.log(failed)
					})
			}
		}
})}
}]);


	    
