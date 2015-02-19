app.factory('Event', ['$resource', function($resource){
	return $resource('./../api/event/:id', {id: '@_id'}, {
		query: {method: 'GET', isArray:true},
		get: {method:'GET', isArray:false},
		put: {method:'PUT', isArray:false},
		remove:{method: 'DELETE', isArray:false}
	});
}]);

app.factory('NewEvent', ['$resource', function($resource){
	return $resource('./../api/event/', {}, {
		create: {method: 'POST'}
	});	
}]);

app.factory('EventByOrganizerId', ['$resource', function($resource){
	return $resource('./../api/usr/:id/event', {id: '@_id'}, {
		query: {method: 'GET', isArray:true},
	});		
}]);