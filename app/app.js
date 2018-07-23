
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
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'BookController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
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
        //console.log($scope);
       $http.delete('/books/' + $scope.books[0].author);
    };



    $scope.addBook = function () {
        $http.post('/books/add', JSON.stringify($scope.newBook));
        //console.log('New Book ' + $scope.newBook);

        $scope.newBook.isbn = '',
            $scope.newBook.title = '',
            $scope.newBook.author = '',
            $scope.newBook.pages = '',
            $scope.newBook.description = ''
    }

    $http.get('/books/add').success(function (data) {
        $scope.books = data;
        //console.log('Inside Book controller ' + data);
    });
}]);

bookApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/books/add').success(function (data) {
        $scope.books = data;
        //console.log('Inside Home controller ' + data);

    });
}]);

bookApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {

    $scope.sendMessage = function () {
        $location.path('/contact-success');
    };

}]);

 //delete function
 $('.delete-book').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
        type: 'DELETE',
        url: '/books/' + id,
        success: (response) => {
            alert('Deleting Book');
            window.location.href = '/';
        },
        error: (err) => console.log(err)
    });
});
