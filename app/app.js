var demoApp = angular.module('demoApp', ['ngRoute', 'ngSanitize']);

demoApp.config(function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			controller: 'ProductController',
			templateUrl: 'app/partials/product.html'
		})
		.when('/product_:prodID',
		{
			controller: 'FetchController',
			templateUrl: 'app/partials/mpa.html'
		})
		.when('/product_:prodID/category_:catID',// from partial: #/product_{{prod.ID}}/category_{{cat.ID}}
		{
			controller: 'FetchController',
			templateUrl: 'app/partials/productcategory.html'
		})
		.when('/detail_:articleID',
		{
			controller: 'DetailController',
			templateUrl: 'app/partials/detail.html'
		})
		.otherwise({ redirectTo: '/' });
});