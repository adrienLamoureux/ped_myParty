// HomePage Controller
app.controller('PaymentCtrl', ['$scope', 'ngProgress', '$route', '$http', '$location', '$routeParams', 'Notification','Command','$timeout', function ($scope, ngProgress, $route, $http, $location, $routeParams, Notification, Command, $timeout){

	ngProgress.color("#B40404");

	Stripe.setPublishableKey("pk_test_spg7Y8RNHDKmrYrSz6wLpE9M");

    $scope.successPayment = false;

    Command.get({id: $routeParams.id}).$promise.then(function(res){
          $scope.amountTotal = res.totalAmount;
    }, function(err){
        console.log(err)
    })

	// Display an error message
	function displayError(message) {
		if (message) {
			$('#error-message').text(message);
			$('#error').show();
		} else {
			$('#error').hide();
		}
	}

	function isDisabled(){
		$scope.isDisabled = true;
	}

	function enable(){
		$scope.isDisabled = false;
	}


    function saveCreditCard(callback) {
        isDisabled()
        Stripe.card.createToken({
            name: $('#first_name').val(),
            number: $('#card_number').val(),
            cvc: $('#cvc').val(),
            exp_month: $('#expiration_month').val(),
            exp_year: $('#expiration_year').val()
        }, function(status, response) {
            if (response.error) {
                displayError(response.error.message);
                $scope.$apply(enable());
            } else {
                response.price = $scope.amountTotal * 100;
                UserApp.User.get({
                    "user_id" : 'self'
                }, function (err, res){
                    if(err) console.log(err)
                    else 
                        response.user = res[0].email;
                        callback(response)
                });
            }
        });
    }

    function updateChargeId(charge_id){
        Command.put({id : $routeParams.id}, {"charge_id": charge_id, "buy": true}).$promise.then(function(res){
            $location.path('/usr/cmd/'+ $routeParams.id)
        }, function(err){
            console.log(err)
        })
    }

    $scope.payment = function() {
        $('#error').hide();
        saveCreditCard(function(response){
        $http.post('/charge', response)
            .success(function(data, status, headers, config) {
                $('#success-message').text(data.status);
                $('#success').show();
                notification3Sec("Merci pour votre commande !", "Commande effectuée");

                //set timeout to see succeeded message after paying
                updateChargeId(data.id)

            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
        
    })
    return false;
    }


	$scope.refund = function(data, amountOptional){
		$('#error').hide();
		console.log(data)
		data.optionalA = amountOptional;
		$http.post('/refund', data)
		.success(function(data, status, headers, config) {
			$('#success-message').text("Vous avez bien été remboursé, ce dernier sera effectif sur votre compte sous 10 jours");
			$('#success').show();
		})
		.error(function(data, status, headers, config) {
			console.log(data);
		});
		return false;
	}

	var notification3Sec = function(text, notifTitle) {
		Notification.success({message: text, delay: 3000, title: '<i>'+notifTitle+'</i>'});
	};

}]);