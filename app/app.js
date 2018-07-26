var bookApp = angular.module('bookApp', ['ngRoute']);

bookApp.config(['$routeProvider', function ($routeProvider) {

    // $locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/add', {
            templateUrl: 'views/add-book.html',
            controller: 'BookAddController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/book-list', {
            templateUrl: 'views/book-list.html',
            controller: 'BookListController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            // controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/:bookTitle', {
            templateUrl: 'views/book-details.html',
            // controller: 'BookDetailsController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);

bookApp.factory('books', function ($http) {

    var cachedData;

    //actually is list() fn but with cached data
    function getData(callback) {

        $http({
            method: 'GET',
            url: '/books/',
            cache: true
        }).success(callback);
    }

    return {
        list: getData,
        find: function (title, callback) {
            getData(function (data) {
                var book = data.filter(function (entry) {
                    return entry.title === title;
                })[0];
                callback(book);
            });
        }
    };
});

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


bookApp.filter('encodeURI', function () {
    return window.encodeURI;
})

//delete function with jquery, not sure if needed ..
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