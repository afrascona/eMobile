var demoApp = angular.module('demoApp', ['ngRoute', 'ngSanitize']);

demoApp.config(function ($routeProvider) {
	$routeProvider
		.when('/',
		{
			controller: 'FetchController',
			templateUrl: 'app/partials/mpa.html'
		})
		.when('/detail_:articleID',
		{
			controller: 'DetailController',
			templateUrl: 'app/partials/detail.html'
		})
		.otherwise({ redirectTo: '/' });
});