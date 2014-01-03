var demoApp = angular.module('demoApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'ngTouch']);

demoApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/products.html',
			resolve:{
				report:function(){
					//console.log('MainController fired');
				}
			}
		})
		
		.when('/product_:prodID',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/products.html',
		})
		
		.when('/product_:prodID/category_:catID',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/detail.html',
		})
		
		.when('/product_:prodID/category_:catID/detail_:ansID',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/detail.html',
		})

		.when('/search::searchTerm',
		{
			controller: 'SearchController',
			templateUrl: 'app/partials/searchResults.html'
		})
		/*
		.otherwise({
			redirectTo: '/'
		});
*/

}]);