app.factory('Ticket', ['$resource', function($resource){
	return $resource('./../api/ticket/:id', {id: '@_id'}, {
		query: {method: 'GET', isArray:true},
		get: {method:'GET', isArray:false},
		post: {method:'POST', isArray:false},
		put: {method:'PUT', isArray:false},
		delete:{method: 'DELETE', isArray:false}
	});
}]);