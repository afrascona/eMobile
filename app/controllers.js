demoApp.controller('FetchController', function ($scope, $http, $routeParams, $templateCache) {
  $scope.method = 'JSONP';
  $scope.url = 'http://support.expedia.com/cc/kfController/getAngular/' + $routeParams.prodID + '/' + $routeParams.catID + '?callback=JSON_CALLBACK';
  
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
  //console.log($routeParams.articleID);
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

demoApp.controller('ProductController', function($scope, $routeParams){
  $scope.products = [
    {'ID':'4','Name':'Flights','Categories':
      [
        {'ID':'35','Name':'Check-in'},
        {'ID':'59','Name':'Seat'},
        {'ID':'31','Name':'Baggage'},
        {'ID':'51','Name':'Review Itinerary'},
        {'ID':'34','Name':'Change / Cancel'},
        {'ID':'30','Name':'Amenities and Accessibility'},
        {'ID':'53','Name':'Payment / Receipt'},
        {'ID':'72','Name':'Travel Documents'},
        {'ID':'32','Name':'Booking'}
      ]
    },
    {'ID':'2','Name':'Hotels','Categories':
      [
        
      ]
    },
    {'ID':'4','Name':'Vacation Packages','Categories':
      [

      ]
    },
    {'ID':'3','Name':'Cars','Categories':
      [

      ]
    },
    {'ID':'2','Name':'Cruises','Categories':
      [

      ]
    },
    {'ID':'2','Name':'Things To Do','Categories':
      [

      ]
    },
    {'ID':'2','Name':'Rewards','Categories':
      [

      ]
    },
    {'ID':'2','Name':'Other','Categories':
      [

      ]
    },
    {'ID':'2','Name':'Travel Alerts','Categories':
      [

      ]
    }
  ];
});