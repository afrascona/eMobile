demoApp.factory('simpleFactory', function($scope, $http, $templateCache){
	var factory = {};
	factory.method = 'JSONP';
	factory.url = 'http://support.expedia.com/cc/kfController/getAngular/4/35?callback=JSON_CALLBACK';
 
	factory.getMostPopularArticles = function() {
		this.code = null;
		this.response = null;

		$http({
			method: this.method,
			url: this.url
		}).
		  success(function(data, status) {
		    this.status = status;
		    this.data = data;
		  }).
		  error(function(data, status) {
		    this.data = data || "Request failed";
		    this.status = status;
		});
	};
	return factory;
});

/* example

.controller('SimpleController', function($scope, simpleFactory){
	$scope.customers = simpleFactory.getCustomers();
});

*/