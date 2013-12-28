var demoApp = angular.module('demoApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngResource', 'ui.bootstrap']);

demoApp.config(function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			controller: 'MainController',
			templateUrl: 'app/partials/products.html'
		})
		
		.when('/product_:prodID',
		{
			controller: 'MainController',
			templateUrl: 'app/partials/products.html'
		})
		
		.when('/product_:prodID/category_:catID',
		{
			controller: 'MainController',
			templateUrl: 'app/partials/products.html'
		})
		
		.when('/product_:prodID/category_:catID/detail_:ansID',
		{
			controller: 'MainController',
			templateUrl: 'app/partials/detail.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});