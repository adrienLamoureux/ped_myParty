// Event List Directive Controller
app.controller('EventListCtrl', ['$scope', 'Event', 'ngProgress', function ($scope, Event, ngProgress){
	ngProgress.color("#B40404");
	ngProgress.start();
	
	$scope.events = Event.query(function(data){
		$scope.events = data;
		ngProgress.complete();
	});

	$scope.dateNotExpired=function(date){
		return Date.parse(date)>Date.now();
	}
}]);