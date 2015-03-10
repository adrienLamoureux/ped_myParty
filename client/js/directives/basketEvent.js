// basketEvent Directive 
app.directive('basketEvent', function (){
	return {
		restrict: 'E',
		controller: 'BasketEventCtrl',
		templateUrl: '../../partials/directives/basketEvent.html'
	};
});