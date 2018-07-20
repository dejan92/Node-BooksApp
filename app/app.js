

var bookApp = angular.module('bookApp', ['ngRoute']);

bookApp.config(['$routeProvider', function ($routeProvider) {

    // $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'BookController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);

bookApp.directive('randomBook', [function () {

    return {
        restrict: 'E',
        scope: {
            books: "=",
            title: "="
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };

}]);

bookApp.controller('BookController', ['$scope', '$http', function ($scope, $http) {

    $scope.removeBook = function (book) {
        let removedBook = $scope.books.indexOf(book);

        $scope.books.splice(removedBook, 1);
    };

    $scope.addBook = function () {
        $scope.books.push({
            title: $scope.newBook.title,
            author: $scope.newBook.author,
            price: parseInt($scope.newBook.price),
            thumb: $scope.newBook.photo,
            available: true
        });

        $scope.newBook.title = '',
        $scope.newBook.author = '',
        $scope.newBook.price = ''
    };

    $http.get('data/books.json').success(function (data) {
        $scope.books = data;
    });
}]);

bookApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/books.json').success(function (data) {
        $scope.books = data;
    });
}]);

bookApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {

    $scope.sendMessage = function () {
        $location.path('/contact-success');
    };

}]);