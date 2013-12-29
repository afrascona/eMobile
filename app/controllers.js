demoApp.controller('MainController', function ($scope, $route, $routeParams, $location, $templateCache, $rootScope, GetCategories, SearchService) {

  $scope.updateURL = function(newURL){
    $location.path(newURL).replace();
  }
  
  $scope.products = GetCategories;

  $scope.manageVis = function(id){
    for($i=$scope.products.length-1;$i>-1;$i--){
      ($scope.products[$i]['ID'] == id) ? $scope.products[$i]['Visible'] = true:$scope.products[$i]['Visible'] = false;
    }
    //$location.path('product_'+id);
    //$location.search('product',id);
    //$location.hash('product_' + id).replace();
    //$location.path('product_' + id).replace().notify(false);
  }
//  $scope.manageVis($routeParams.prodID);

  $scope.svc = SearchService;

  $scope.getArticleList = function (prodID, catID) {
    $scope.showLoader = 'hello';
    $scope.articleList = "";
    $routeParams.prodID = prodID;
    $routeParams.catID = catID;
    kfMethodName = 'getAngular';
    $scope.newList = $scope.svc.articles({prod:$routeParams.prodID, cat:$routeParams.catID, kfMethod:kfMethodName}).getArticles(function(data) {
        $scope.articleList = data;
        //$location.search('category',$routeParams.catID);
        //$route.current = '/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '/';
    });
  }
//  $scope.articleList = $scope.articleList();

  $scope.answerDetail = function () {
      kfMethod = 'getFullAnswersAngularAjax';
      $scope.newDetail = $scope.svc.answer({ans:$routeParams.ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
        detail['prodID'] = $routeParams.prodID;
        detail['catID'] = $routeParams.catID;
        detail['ansID'] = $routeParams.ansID;
        $scope.answerDetail = detail;
      });
  }
$scope.answerDetail = $scope.answerDetail();

  $scope.productSpecific = function(cat,prod){
    //console.log(cat);
    //console.log(prod);
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
});