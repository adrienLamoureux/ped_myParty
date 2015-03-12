// HomePage Controller
app.controller('HomeCtrl', ['$scope', 'ngProgress', 'User', '$rootScope', 'Command', function ($scope, ngProgress, User, $rootScope, Command){

	ngProgress.color("#B40404");
	ngProgress.start();

	var currentUserId = $rootScope.user.user_id;		

	console.log(currentUserId)

	User.get({id : currentUserId}).$promise.then(function(success){
		console.log("apiID" + success.apiID)
		console.log(success)
		if(success.apiID == currentUserId){
			console.log('User Still created')
		}else {
			var cmdJSON = {
				commands:[]
			};
			var cmd = Command.post(cmdJSON, function(data){
				cmd = data;
				var user = {
					"apiID" : currentUserId,
					"photo" : {

					},
					"commandsID": cmd._id
				};

				User.post(user).$promise.then(function(success){
					console.log("success to create")
				}, function(failed){
					console.log("failed")
				});
			}, function(err){
				console.log(err)
			});
			
		}
	}, function (failed){
		console.log(failed)
	}, ngProgress.complete());

	$scope.deleteUser = function(){
		User.remove({id : currentUserId},function(succes){
			console.log(succes)
		}, function(failed){
			console.log(failed);
		});
	}


	


}]);