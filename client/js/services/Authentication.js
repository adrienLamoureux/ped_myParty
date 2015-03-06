app.factory('AuthenticationService',function(){
	var auth = {
		isLogged: false
	};
	
	return auth;		
});

app.factory('UserService', function($http) {
	return {
		logIn: function(username, password) {
			return $http.post(options.api.base_url + '/login', {username: username, password: password});
		},

		logOut: function(){

		}
	}
});