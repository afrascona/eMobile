var demoApp = angular.module('demoApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'ngTouch']);

demoApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/products.html'
		})
		
		.when('/product_:prodID',
		{
			reloadOnSearch: false,
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

}]);