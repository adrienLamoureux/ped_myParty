// HomePage Controller
app.controller('PaymentCtrl', ['$scope', 'ngProgress', '$route', '$http', '$location', '$routeParams', 'Notification', function ($scope, ngProgress, $route, $http, $location, $routeParams, Notification){

    ngProgress.color("#B40404");

    Stripe.setPublishableKey("pk_test_spg7Y8RNHDKmrYrSz6wLpE9M");

    var totalAmount = $scope.amountTotal = $routeParams.total; 
    $scope.successPayment = false;

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
                response.price = totalAmount * 100;
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

    $scope.payment = function() {
        $('#error').hide();
        saveCreditCard(function(response){
        $http.post('/charge', response)
            .success(function(data, status, headers, config) {
                $('#success-message').text(data.status);
                $('#success').show();
                notification3Sec("Merci pour votre commande !", "Commande effectuée");
                $location.path('/usr/cmd/'+ $routeParams.id)
                $scope.$watch(function charge(){
                     return data;
                  }, 
                  function settingCharge(charge){
                      $scope.data = charge; 
                      console.log(charge)
                  }
                );
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

notification3Sec = function(text, notifTitle) {
         Notification.success({message: text, delay: 3000, title: '<i>'+notifTitle+'</i>'});
    };

}]);