// Recuperer le panier avec l'id de l'utilisateur
app.factory('User', ['$resource', function($resource){
	return $resource('./../api/user/:id', {id: '@_id'}, {
		get : {method: 'GET', isArray:false},
  		post : {method: 'POST', isArray:false},
  		put: {method:'PUT', isArray:false},
  		remove: {method:'DELETE', isArray:false}
  	});  
}]);

app.factory('Command', ['$resource', function($resource){
	return $resource('./../api/command/:id', {id: '@_id'}, {
		get : {method: 'GET', isArray:false},
  		post : {method: 'POST', isArray:false},
  		put: {method:'PUT', isArray:false}, 
  		delete:{method: 'DELETE', isArray:false}
  	});  
}]);