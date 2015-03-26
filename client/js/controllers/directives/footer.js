//footer.js
// NavigationBar Controller
app.controller('FooterCtrl', ['$scope','Contact', function ($scope, Contact){
	$scope.mailToContact = Contact.get();
		
}]);