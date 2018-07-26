var bookApp = angular.module('bookApp');

bookApp.controller('BookAddController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    //getting the data from DB
    $http.get('/books/').success(function (data) {
        $scope.books = data;
    });

    $scope.addBook = function () {
        $http.post('/books/add', JSON.stringify($scope.newBook))
            .then(function () {
                console.log('response successful, please redirect');
                //redirect to list of books 
                $location.path('/book-list');
            });

        $scope.newBook.isbn = '',
            $scope.newBook.title = '',
            $scope.newBook.author = '',
            $scope.newBook.pages = '',
            $scope.newBook.description = '',
            $scope.newBook.photo = ''
    }
}]);