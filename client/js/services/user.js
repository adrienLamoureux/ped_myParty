// Recuperer le panier avec l'id de l'utilisateur
app.factory('User', ['$resource', function($resource){
	return $resource('./../api/user/:id', {id: '@_id'}, {
		'get' : {method: 'GET', isArray:false},
  		'update' : {method: 'PUT', isArray:false},
  		'create' : {method : 'POST'}
  	});  
}]);