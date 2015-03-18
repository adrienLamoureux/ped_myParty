app.factory('Event', ['$resource', function($resource){
	return $resource('./../api/event/:id', {id: '@_id'}, {
		query: {method: 'GET', isArray:true},
		get: {method:'GET', isArray:false},
		post: {method:'POST', isArray:false},
		put: {method:'PUT', isArray:false},
		delete:{method: 'DELETE', isArray:false}
	});
}]);

app.factory('EventImages', ['$resource', function($resource){
	return $resource('./../api/event/:id/images', {id: '@_id'}, {
		get: {method:'GET', isArray:false},
		post: {method:'POST', isArray:false},
		put: {method:'PUT', isArray:false},
		remove:{method: 'DELETE', isArray:false}
	});
}]);

app.factory('EventByOrganizerId', ['$resource', function($resource){
	return $resource('./../api/user/:id/event', {id: '@_id'}, {
		query: {method: 'GET', isArray:true},
	});		
}]);

app.factory('EventTicketValidate', ['$resource', function($resource){
	return $resource('./../api/:idOwner/event/:id/ticket/:idt/validate/:toValide', {idOwner: 'apiID', id: '@_id', idt: '@_id'}, {
		get: {method:'GET', isArray:false}
	});
}]);