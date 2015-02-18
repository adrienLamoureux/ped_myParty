app.factory('Event', ['$resource', function($resource){
	var factory = function ($resource){
		return $resource('./../api/event/:id', {id: '@_id'}, {
			query: {method: 'GET', isArray:true},
			get: {method:'GET', isArray:false},
			put: {method:'PUT', isArray:false},
			remove:{method: 'DELETE', isArray:false}
		});	
	};
	return factory;
}]);

app.factory('NewEvent', ['$resource', function($resource){
	var factory = function ($resource){
		return $resource('./../api/event/', {
			create: {method: 'POST'}
		});	
	};
	return factory;
}]);

app.factory('EventByOrganizerId', ['$resource', function($resource){
	var factory = function ($resource){
		return $resource('./../api/usr/:id/event', {id: '@_id'}, {
			query: {method: 'GET', isArray:true},
		});		
	};	
	return factory;
}]);