// basketEvent Directive 
app.directive('basketEvent', function (){
	return {
		scope : {
			anevent : '='
		},
		restrict: 'E',
		controller: 'BasketEventCtrl',
		templateUrl: '../../partials/directives/basketEvent.html'
	};
});