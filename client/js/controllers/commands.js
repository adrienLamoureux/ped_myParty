app.controller('CommandsCtrl', ['$scope', '$rootScope', 'User', 'Command', 'ngProgress', function ($scope, $rootScope, User, Command, ngProgress){
	ngProgress.color("#B40404");
	ngProgress.start();
	
	$scope.commands = [];

	$scope.mongoUser = User.get({id:$rootScope.user.user_id}, function (userData){
		mongoUser = userData;

		angular.forEach(mongoUser.commandsID, function (cmdID, key){
			var cmd = Command.get({id:cmdID}, function (cmdData){
				cmd = cmdData;
				if (cmd.partiallyCanceled == true){
					cmd.canceled = (cmd.canceled == true)?"Annulée": "Partiellement Annulée";
				} else {
					cmd.canceled = "Valide";
				}
				$scope.commands.push(cmd);
			}, function (err){
				console.log(err);
			});
		});
		ngProgress.complete();
	}, function(err){
		console.log(err);
	});
}]);