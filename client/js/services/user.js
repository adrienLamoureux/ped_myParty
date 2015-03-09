// Recuperer le panier avec l'id de l'utilisateur
app.factory('User', ['$resource', function($resource){
	return $resource('./../api/user/:id', {id: '@_id'},
		{'query': {method: 'GET', isArray:true}}
	);		
}]);

// Ajouter un article au panier
app.factory('AddTicketToBasket', ['$resource', function($resource){
	return $resource('./../api/user/:id', {id: '@_id'}, {
		'update' : {method: 'PUT', isArray:false},
	});		
}]);