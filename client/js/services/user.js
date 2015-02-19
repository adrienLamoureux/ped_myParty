app.factory('BasketWithUserId', ['$resource', function($resource){
	var factory = function ($resource){
		return $resource('./../api/usr/:id/basket', {id: '@_id'}, {
			query: {method: 'GET', isArray:true},
		});		
	};
	return factory;
}]);