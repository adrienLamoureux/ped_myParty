app.factory('Event', ['$resource', function($resource){
	var factory = function ($resource){

		return $resource('./../api/events',{
			query: {method: 'GET', isArray:true}
		});

	};
	
	return factory;
}]);