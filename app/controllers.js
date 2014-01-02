demoApp.controller('MainController', function ($scope, $route, $routeParams, $location, $templateCache, $rootScope, $timeout, $interval, GetCategories, SearchService) {
 
  $scope.setTest = function(viewSet){
    $rootScope.rootScopeTest = viewSet;
  }

  $scope.go = function(path,newAnimation) {
    $rootScope.rootScopeTest = newAnimation;
    $location.path(path);
  }

  $scope.breadcrumbMiddle = '';


  $scope.updateURL = function(newURL){
    $location.path(newURL).replace();
  }
  
  $scope.products = GetCategories;

  $scope.manageVis = function(id){
    for($i=$scope.products.length-1;$i>-1;$i--){
      //($scope.products[$i]['ID'] == id) ? $scope.products[$i]['Visible'] = true:$scope.products[$i]['Visible'] = false;
      if($scope.products[$i]['ID'] == id){
        $routeParams.prodID = $scope.products[$i]['ID'];
        $routeParams.prodName = $scope.products[$i]['Name'];
        $scope.products[$i]['Visible'] = true;
      }else{
        $scope.products[$i]['Visible'] = false;
      }
    }

    if(id != 0){
      $scope.breadcrumbMiddle = '<a href="#/product_' + $routeParams.prodID + '">' + $routeParams.prodName + '</a>';
    }
  }
  if($routeParams.prodID){
    $scope.manageVis($routeParams.prodID);
  }else{
    $scope.manageVis('');
  }

  $scope.svc = SearchService;

  $scope.getArticleList = function (prodID, catID) {
    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
    $scope.articleList = [];
    //$scope.articleList[0] = {};
    //$scope.articleList[0]['Title'] = "Loading...";
    $routeParams.prodID = prodID;
    $routeParams.catID = catID;
    kfMethodName = 'getAngular';
    $scope.newList = $scope.svc.articles({prod:$routeParams.prodID, cat:$routeParams.catID, kfMethod:kfMethodName}).getArticles(function(data) {
        $scope.articleList = data;
        $scope.loadingIcon = '';
        //$location.search('category',$routeParams.catID);
        //$route.current = '/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '/';
    });
  }
//  $scope.articleList = $scope.articleList();

  $scope.answerDetail = function () {
    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
    $scope.answerDetail = false;
    kfMethod = 'getFullAnswersAngularAjax';
    $scope.newDetail = $scope.svc.answer({ans:$routeParams.ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
      detail['prodID'] = $routeParams.prodID;
      detail['catID'] = $routeParams.catID;
      detail['ansID'] = $routeParams.ansID;
      $scope.answerDetail = detail;

      $scope.breadcrumbMiddle = '<a href="#/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '/detail_' + $routeParams.ansID + '">' + detail['Title'] + '</a>';
      //$scope.breadcrumb = $scope.makeBreadCrumb($scope.breadcrumbMiddle);
      $scope.relatedText = "<strong>Related Answers:</strong>";
      $scope.loadingIcon = '';
    });
  }

  if($routeParams.ansID){
    $scope.answerDetail = $scope.answerDetail();
  }


  $scope.$on('detailReturned', function(event, mass) {
    console.log(mass);
    console.log('detailReturned');
    //$scope.myClassVar = 'view-frame-2';
    console.log($scope.myClassVar);
  });
  $scope.$on('articleListReturned', function(event, mass) {
    console.log(mass);
    console.log('articleListReturned');
    //$scope.myClassVar = 'view-frame-1';
    console.log($scope.myClassVar);
    /*
    stop = $interval(function() {
      $scope.myClassVar = 'view-frame-2';
    }, 2000);
*/
  });
  $scope.$on('productsReturned', function(event, mass) {
    console.log(mass);
    console.log('productsReturned');
    //$scope.myClassVar = 'view-frame-1';
    console.log($scope.myClassVar);
  });



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

  /*
  var styles = {
    // appear from right
    front: '.enter-setup {   position:absolute;   -webkit-transition: 0.5s ease-out all;   -webkit-transform:translate3d(100%,0,0)  }  .enter-setup.enter-start {   position:absolute;  -webkit-transform:translate3d(0,0,0)}  .leave-setup {   position:absolute;   -webkit-transition: 0.5s ease-out all;   -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(-100%,0,0) };',
    // appear from left
    back: '.enter-setup {   position:absolute;   -webkit-transition: 0.5s ease-out all; -webkit-transform:translate3d(-100%,0,0)}  .enter-setup.enter-start {   position:absolute;   -webkit-transform:translate3d(0,0,0) }  .leave-setup {   position:absolute;   -webkit-transition: 0.5s ease-out all;  -webkit-transform:translate3d(0,0,0)} .leave-setup.leave-start {   position:absolute;  -webkit-transform:translate3d(100%,0,0) };'
  };
  
  $scope.direction = function(dir) {
    // update the animations classes
    $rootScope.style = styles[dir];
  }

  $scope.go = function(path) {
    $location.path(path);
  }
  $scope.direction('front');
  */

})
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

demoApp.animation('.view-frame-3', function() {
  return {
    enter : function(element, done) {
      element.css('opacity',0);
      jQuery(element).animate({
        opacity: 1
      }, done);
      /*
      opacity: 0.25,
    left: "+=50",
    height: "toggle"
    */
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