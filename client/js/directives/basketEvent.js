// basketEvent Directive 
app.directive('basketOneEvent', function (){
	return {
		restrict: 'E',
		controller: 'BasketOneEventCtrl',
		templateUrl: '../../partials/directives/basketEvent.html'
	};
});