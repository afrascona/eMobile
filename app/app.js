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
			controller: 'MainController',
			templateUrl: 'app/partials/products.html',
			resolve: {
		    	delay: function($q, $timeout) {
		        	var delay = $q.defer();
		        	$timeout(delay.resolve, 1000);
		    		return delay.promise;
		    	}
		    }
		})
		
		.when('/product_:prodID/category_:catID/detail_:ansID',
		{
			reloadOnSearch: false,
			controller: 'MainController',
			templateUrl: 'app/partials/detail.html',
		})
		/*
		.otherwise({
			redirectTo: '/'
		});
*/

}]);