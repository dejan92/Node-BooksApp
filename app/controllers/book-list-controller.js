var bookApp = angular.module('bookApp');

bookApp.controller('BookListController', ['$scope', '$http', 'books', function ($scope, $http, books) {
    //getting the data from DB
    // $http.get('/books/').success(function (data) {
    //     $scope.books = data;
    // });
    books.list(function (books) {
        $scope.books = books;
    })

    $scope.sortField = 'title';
    $scope.reverse = true;

}]);