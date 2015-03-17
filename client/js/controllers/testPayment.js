

// HomePage Controller
app.controller('PaymentCtrl', ['$scope', 'ngProgress', 'User', 'Command','$q', '$route', '$http',function ($scope, ngProgress, User, Command, $q, $route, $http){

    ngProgress.color("#B40404");

    Stripe.setPublishableKey("pk_test_spg7Y8RNHDKmrYrSz6wLpE9M");

    // Display an error message
    function displayError(message) {
        if (message) {
            $('#error-message').text(message);
            $('#error').show();
        } else {
            $('#error').hide();
        }
    }

    function saveCreditCard(callback) {
        Stripe.card.createToken({
            name: $('#first_name').val(),
            number: $('#card_number').val(),
            cvc: $('#cvc').val(),
            exp_month: $('#expiration_month').val(),
            exp_year: $('#expiration_year').val()
        }, function(status, response) {
            if (response.error) {
                displayError(response.error.message);
            } else {
                response.price = 1500//$scope.totalAmount;
                console.log(response)
                callback(response);
            }
        });
    }

    $scope.payment = function() {
        saveCreditCard(function(response){
            console.log(response)
    
        $http.post('/charge', response)
            .success(function(data, status, headers, config) {
              console.log(data)
            })
            .error(function(data, status, headers, config) {
              console.log(data)
            });
    })
    return false;
    }


}]);