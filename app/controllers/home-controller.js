var bookApp = angular.module('bookApp');

bookApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/books/').success(function (data) {
        $scope.books = data;
        

    });
}]);