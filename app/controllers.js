demoApp.controller('MainController', function ($scope, $route, $routeParams, $location, $templateCache, $rootScope, $timeout, $interval, GetCategories, SearchService) {
 
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
  $rootScope.initBread();

  $scope.lastAccordion = '';
  $scope.manageVis = function(id){
    if($scope.lastAccordion == id){
      $scope.repeatClick = false;
      $scope.Accordion = '';
    }else{
      $scope.repeatClick = true;
      $scope.lastAccordion = id;
    }
    //console.log(id);
    for($i=$scope.products.length-1;$i>-1;$i--){
      //($scope.products[$i]['ID'] == id) ? $scope.products[$i]['Visible'] = true:$scope.products[$i]['Visible'] = false;
      if($scope.products[$i]['ID'] == id){
        $routeParams.prodID = $scope.products[$i]['ID'];
        $routeParams.prodName = $scope.products[$i]['Name'];
        $scope.products[$i]['Visible'] = $scope.repeatClick;
      }else{
        $scope.lastAccordion = id;
        $scope.products[$i]['Visible'] = false;
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
            $rootScope.setBread($scope.prodID, $scope.prodName, $scope.catID, $scope.catName)
          }
        });
      }
    });
    

    //console.log($scope.products);
    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
    $scope.articleList = [];
    //$scope.articleList[0] = {};
    //$scope.articleList[0]['Title'] = "Loading...";
    $routeParams.prodID = prodID;
    $scope.prodID = prodID;
    $scope.catID = catID;
    $routeParams.catID = catID;
    kfMethodName = 'getAngular';
    $scope.newList = $scope.svc.articles({prod:$routeParams.prodID, cat:$routeParams.catID, kfMethod:kfMethodName}).getArticles(function(data) {
        $scope.articleList = data;
        $scope.loadingIcon = '';
        //$location.search('category',$routeParams.catID);
        //$route.current = '/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '/';
    });
  }
  if($routeParams.prodID && $routeParams.catID){
    $scope.getArticleList($routeParams.prodID,$routeParams.catID);
  }

  $scope.getAnswerDetail = function (prodID, catID, ansID) {
    $scope.answerDetail = [];
    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
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
  /*
  $scope.productSpecific = function(cat,prod){
    if(cat != undefined && prod != undefined){
      if(cat == $routeParams.catID && prod == $routeParams.prodID){
        return true;
      }else{ return false; }
    }
  }

  $scope.answerSpecific = function(cat, prod, ans){
    if(cat != undefined && prod != undefined && ans != undefined){
      if(cat == $routeParams.catID && prod == $routeParams.prodID && ans == $routeParams.ansID){
        return true;
      }else{ return false; }
    }
  }
  */
})
/*
.directive('loadingIcon', function() {
  return {
    loadingIcon: '<i class="icon-refresh"></i>'
  }
})
 .directive('pane', function(){
    return {
      restrict: 'E',
      transclude: true,
      scope: { title:'@' },
      template: '<div style="border: 1px solid black;">' +
                  '<div style="background-color: gray">{{title}}</div>' +
                  '<div ng-transclude></div>' +
                '</div>'
    };
});

.animation('.view-frame-3', function() {
  return {
    enter : function(element, done) {
      element.css('opacity',0);
      jQuery(element).animate({
        opacity: 1
      }, done);

      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    leave : function(element, done) {
      element.css('opacity', 1);
      jQuery(element).animate({
        opacity: 0
      }, done);
 
      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    move : function(element, done) {
      element.css('opacity', 0);
      jQuery(element).animate({
        opacity: 1
      }, done);
 
      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
 
    // you can also capture these animation events
    addClass : function(element, className, done) {
      console.log('addClass'  + ' ' + element + ' ' + className + ' ' + done);
      console.log($scope.myClassVar);
    },
    removeClass : function(element, className, done) {
      console.log('removeClass' + ' ' + element + ' ' + className + ' ' + done);
      console.log($scope.myClassVar);
    }
  }
});
*/

demoApp.controller('BreadcrumbController', function ($scope, $route, $routeParams, $rootScope, $location) {

  $rootScope.initBread = function(){
    $rootScope.breadcrumb = [{ 'ID': 0, 'Name': 'Home', 'destination': '/', 'animation': 'view-frame-2' }];
  };

  $rootScope.setBread = function(){

    if($rootScope.breadcrumb.length == 0){
      //$rootScope.breadcrumb.push({ 'ID': 0, 'Name': 'Home', 'destination': '/', 'animation': 'view-frame-2' }); 
    }
    console.log($rootScope.breadcrumb);

    switch(arguments.length){
      case 2: newItem = { 'ID': arguments[0], 'Name': arguments[1], 'destination': '/product_' + arguments[0], 'animation': 'view-frame-2' }; break;
      case 4: newItem = { 'ID': arguments[2], 'Name': arguments[3], 'destination': '/product_' + arguments[0] + '/category_' + arguments[2], 'animation': 'view-frame-2' }; break;
      case 6: newItem = { 'ID': arguments[4], 'Name': arguments[5], 'destination': '/product_' + arguments[0] + '/category_' + arguments[2] + '/detail_' + arguments[4], 'animation': 'view-frame-1' }; break;
    }
    $rootScope.breadcrumb.push(newItem);
  };

  $scope.go = function(path,newAnimation) {
    $rootScope.initBread();
    $rootScope.rootAnimation = newAnimation;
    $location.path(path);
  }
});

demoApp.controller('SearchController', function ($scope, $route, $routeParams, $rootScope, $location, SearchService) {

  $scope.svc = SearchService;
  $scope.searchCustomerSupportTxt = "Search Customer Support";

  $scope.getRelevantList = function (searchTerm) {

    $scope.searchTerm = searchTerm;

    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
    $scope.relevantList = [];
    //$scope.articleList[0] = {};
    //$scope.articleList[0]['Title'] = "Loading...";

    kfMethodName = 'searchAjaxIse/1';
    $scope.newList = $scope.svc.relevant({kfMethod:kfMethodName, searchTerm:$scope.searchTerm}).getResults(function(data) {
        $scope.resultList = data;
        $scope.loadingIcon = '';
    });
  }

});