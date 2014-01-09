demoApp.controller('MainController', function ($scope, $route, $routeParams, $location, $templateCache, $rootScope, $timeout, $interval, GetCategories, SearchService) {

  if($rootScope.rootAnimation == undefined){
    //console.log('none');
  }
  $scope.setTest = function(viewSet){
    $rootScope.rootAnimation = viewSet;
  }
  
  $scope.go = function(path,newAnimation) {
    $rootScope.rootAnimation = newAnimation;
    $location.path(path);
  }

  $scope.updateURL = function(newURL){
    $location.path(newURL).replace();
  }
  
  $scope.products = GetCategories;
  
  $scope.manageVis = function(id){
    for($i = $scope.products.length-1; $i > -1; $i--){
      if($scope.products[$i]['ID'] == id){
        $routeParams.prodID = $scope.products[$i]['ID'];
        $routeParams.prodName = $scope.products[$i]['Name'];
        //$scope.products[$i]['Visible'] = $scope.repeatClick;
      }else{
        //$scope.lastAccordion = id;
        //$scope.products[$i]['Visible'] = false;
      }
    }

    if(id != 0){
      $rootScope.initBread();
      $rootScope.setBread($routeParams.prodID, $routeParams.prodName);
    }
  }
  
  if($routeParams.prodID){
    $scope.manageVis($routeParams.prodID);
  }else{
    $scope.manageVis('');
  }

  $scope.svc = SearchService;

  $scope.getArticleList = function (prodID, catID) {

    $scope.prodID = prodID;
    $scope.catID = catID;

    angular.forEach($scope.products, function(value, key) {
      if($scope.prodID == value.ID){
        $scope.prodName = value.Name;
        $scope.prodIcon = value.icon;
        //$rootScope.setBread($scope.prodID, $scope.prodName);
        
        angular.forEach(value.Categories, function(value, key){
          if($scope.catID == value.ID){
            $scope.catName = value.Name;
            $rootScope.setBread($scope.prodID, $scope.prodName, $scope.catID, $scope.catName);
          }
        });
      }
    });
    
    $scope.loadingIcon = '<i class="icon-refresh" style="height:15px !important"></i> Loading...';
    $scope.articleList = [];
    $routeParams.prodID = prodID;
    $scope.prodID = prodID;
    $scope.catID = catID;
    $routeParams.catID = catID;
    kfMethod = 'getAngular';
    $scope.newList = $scope.svc.articles({prod:$routeParams.prodID, cat:$routeParams.catID, kfMethod:kfMethod}).getArticles(function(data) {
        $scope.articleList = data;
        $scope.loadingIcon = '';
    });
  }
  if($routeParams.prodID && $routeParams.catID){
    $scope.getArticleList($routeParams.prodID,$routeParams.catID);
  }

  $scope.getAnswerDetail = function (prodID, catID, ansID) {
    $scope.answerDetail = [];
    $scope.loadingIcon = '<i class="icon-refresh" style="height:15px !important"></i> Loading...';
    $scope.answerDetail = false;
    kfMethod = 'getFullAnswersAngularAjax';
    $scope.newDetail = $scope.svc.answer({ans: ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
      detail['prodID'] = prodID;
      detail['catID'] =  catID;
      detail['ansID'] =  ansID;
      $scope.answerDetail = detail;
      $scope.relatedText = "<strong>Related Answers:</strong>";
      $scope.loadingIcon = '';
    });
  }

})
.directive('headersloaded', function(){
  count = 0;
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      count++;
      $( element ).first('div').addClass( "number" + count );
      //$( element ).first('div').attr('id', 'number' + count );
      //console.log(angular.element(element).scope());
      if(scope.$last){
        scope.headersLoaded = true;
        count = 0;
      }
    }
  }
})
.directive('productsloaded', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if(scope.$last && scope.headersLoaded == true){

        window.instantiateOnceReady();
        window.scrollTo(0,0);
          /*

          var el = document.querySelector("#productsWrapper");
          //el.scrollTo(0,0);
          var top = el.getBoundingClientRect().top;
          console.log( "JS Top: " + top );

          newStickies = new stickyTitles(jQuery(".followMeBar"));
          newStickies.load();

          //console.log("JQuery Top: "+jQuery("#myelementid").offset().top);
          */
      }
    }
  }
});


demoApp.controller('BreadcrumbController', function ($scope, $route, $routeParams, $rootScope, $location) {

  $rootScope.initBread = function(){
    $rootScope.breadcrumb = [{ 'ID': 0, 'Name': 'Home', 'destination': '/', 'animation': 'view-frame-2' }];
  };

  $rootScope.setBread = function(){
    /*
    switch(arguments.length){
      case 1: newItem = { 'ID': null, 'Name': 'Search', 'destination': '', 'animation': 'view-frame-2' }; break;
      case 2: newItem = { 'ID': arguments[0], 'Name': arguments[1], 'destination': '/product_' + arguments[0], 'animation': 'view-frame-2' }; break;
      case 4: newItem = { 'ID': arguments[2], 'Name': arguments[3], 'destination': '/product_' + arguments[0] + '/category_' + arguments[2], 'animation': 'view-frame-2' }; break;
      case 6: newItem = { 'ID': arguments[4], 'Name': arguments[5], 'destination': '/product_' + arguments[0] + '/category_' + arguments[2] + '/detail_' + arguments[4], 'animation': 'view-frame-2' }; break;
    }

    $rootScope.breadcrumb.push(newItem);
    */
  };

  $scope.go = function(path,newAnimation) {
    $rootScope.initBread();
    $rootScope.rootAnimation = newAnimation;
    $location.path(path);
  }
});

demoApp.controller('SearchController', function ($scope, $route, $routeParams, $rootScope, $location, SearchService) {

  $scope.svc = SearchService;
  $scope.searchTerm = "Search Customer Support";

  $scope.getRelevantList = function (searchVar) {
    $scope.searchCustomerSupportTxt = searchVar;
    $routeParams.searchTerm = searchVar;
    $scope.searchTerm = searchVar;

    $scope.loadingIcon = '<i class="icon-refresh" style="height:15px !important"></i> Loading...';
    $scope.resultList = [];
    //$scope.articleList[0] = {};
    //$scope.articleList[0]['Title'] = "Loading...";

    kfMethodName = 'searchAjaxIse/1';
    $scope.newList = $scope.svc.relevant({kfMethod:kfMethodName, searchTerm:$scope.searchTerm}).getResults(function(data) {
        $scope.resultList = data;
        $scope.loadingIcon = 'Search Results: <em>"' + searchVar + '"</em>';
        //$rootScope.setBread(searchVar);
    });
  };

  if($routeParams.searchTerm || $routeParams.search){
    $scope.toSend = $routeParams.searchTerm ? $routeParams.searchTerm : $routeParams.search;
    $scope.getRelevantList($scope.toSend);
  }

  $scope.getAnswerDetail = function (ansID) {
    $scope.answerDetail = [];
    $scope.loadingIconAnswer = '<div class="loadingSearch"><i class="icon-refresh" style="display:block;height:150px !important"></i> Loading...</div>';
    $scope.answerDetail = false;
    kfMethod = 'getFullAnswersAngularAjax';
    $scope.newDetail = $scope.svc.answer({ans: ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
      detail['ansID'] =  ansID;
      $scope.answerDetail = detail;
      $scope.relatedText = "<strong>Related Answers:</strong>";
      $scope.loadingIconAnswer = '';
    });
  }

  $scope.go = function(path, newAnimation) {
    path = "search_" + path;
    $rootScope.initBread();
    $rootScope.rootAnimation = newAnimation;
    $location.path(path);
  }

});

demoApp.controller('SingleController', function ($scope, $route, $routeParams, $rootScope, $location, SearchService) {
  
  $scope.svc = SearchService;

  $scope.getAnswerDetail = function (ansID) {
    $scope.ansID = ansID;
    $scope.answerDetail = [];
    $scope.loadingIconSingle = '<div class="loadingSearch"><i class="icon-refresh" style="display:block;height:150px !important"></i> Loading...</div>';
    $scope.answerDetail = false;
    kfMethod = 'getFullAnswersAngularAjax';
    $scope.newSingleDetail = $scope.svc.answer({ans: ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
      detail['ansID'] =  ansID;
      $scope.answerDetail = detail;
      $scope.relatedText = "";
      $scope.loadingIconSingle = '';
    });
  }

  if($routeParams.ansID){
    $rootScope.initBread();
    $rootScope.setBread($routeParams.ansID);
    $scope.getAnswerDetail($routeParams.ansID);
  }

  $scope.go = function(path, newAnimation) {
    $rootScope.initBread();
    $rootScope.rootAnimation = newAnimation;
    $location.path(path);
  }
});