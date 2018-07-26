var bookApp = angular.module('bookApp');

bookApp.controller('RegisterController', ['$location','$scope', '$http', function($location, $scope, $http){
    $scope.registerUser = function () {
        $http.post('/users/register', JSON.stringify($scope.newUser))
            .then(function(){
                $location.path('/login');
            })
        
    }
}]);