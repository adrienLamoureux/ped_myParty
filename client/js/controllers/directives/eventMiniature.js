// Event Miniature Directive Controller
app.controller('EventMiniatureCtrl', ['$scope', function ($scope){
	$scope.dateNotExpired=function(date){
		return Date.parse(date)>Date.now();
	}
}]);