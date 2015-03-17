app.controller('CommandsCtrl', ['$scope', '$rootScope', 'User', 'Command', function ($scope, $rootScope, User, Command){

	$scope.commands = [];

	$scope.mongoUser = User.get({id:$rootScope.user.user_id}, function (userData){
		mongoUser = userData;

		angular.forEach(mongoUser.commandsID, function (cmdID, key){
			var cmd = Command.get({id:cmdID}, function (cmdData){
				cmd = cmdData;
				$scope.commands.push(cmd);
			}, function (err){
				console.log(err);
			});
		});
	}, function(err){
		console.log(err);
	});
}]);