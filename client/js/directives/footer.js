//footer.js

app.directive('footerBar', function (){
	return {
		restrict: 'E',
		controller: 'FooterCtrl',
		templateUrl: '../../partials/directives/footer.html'
	};
});
