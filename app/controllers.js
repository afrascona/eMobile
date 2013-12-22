demoApp.controller('FetchController', function ($scope, $http, $templateCache) {
  $scope.method = 'JSONP';
  $scope.url = 'http://support.expedia.com/cc/kfController/getAngular/4/35?callback=JSON_CALLBACK';
  console.log('not');
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
 
    $http({
    	method: $scope.method,
    	url: $scope.url,
    	/*params: {
    		callback: "iseArticleResults"
    	},
    	*/
    	cache: $templateCache
    }).
      success(function(data, status) {
        $scope.status = status;
        $scope.articles = data;
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
  };
 
  $scope.updateModel = function(method, url) {
    $scope.method = method;
    $scope.url = url;
  };

  $scope.fetch();
});

demoApp.controller('DetailController', function ($scope, $routeParams, $http) {
  console.log($routeParams.articleID);
  $scope.method = 'JSONP';
  $scope.url = 'http://support.expedia.com/cc/kfController/getFullAnswersAngularAjax/' + $routeParams.articleID + '?callback=JSON_CALLBACK';
 
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
 
    $http({
      method: $scope.method,
      url: $scope.url
    }).
      success(function(data, status) {
        $scope.status = status;
        $scope.answer = data;
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
  };
  
  $scope.fetch();
});