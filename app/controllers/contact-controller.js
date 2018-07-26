var bookApp = angular.module('bookApp');

bookApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {

    $scope.sendMessage = function () {
        $location.path('/contact-success');
    };

}]);