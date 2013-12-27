demoApp.controller('MainController', function ($scope, $routeParams, GetCategories, SearchService) {
  //$scope.answersincategory = false;
  
  $scope.products = GetCategories;

  $scope.manageVis = function(id){
    for($i=$scope.products.length-1;$i>-1;$i--){
      ($scope.products[$i]['ID'] == id) ? $scope.products[$i]['Visible'] = true:$scope.products[$i]['Visible'] = false;
    }
  }
  
  $scope.manageVis($routeParams.prodID);

  svc = SearchService;

  $scope.articleList = function () {
    if($routeParams.prodID && $routeParams.catID){
      //svc = SearchService;
      kfMethod = 'getAngular';
      svc.articles({prod:$routeParams.prodID, cat:$routeParams.catID, kfMethod:kfMethod}).getArticles(function(data) {
        $scope.articleList = data;
        return $scope.articleList;
        //console.log(articles[0]['ID']); 
      });
    }
  }
  $scope.articleList = $scope.articleList();

  $scope.answerDetail = function () {
    if($routeParams.ansID){
      //svc2 = SearchService;
      kfMethod = 'getFullAnswersAngularAjax';
      svc.answer({ans:$routeParams.ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
        return $scope.answerDetail = detail;
        //console.log($scope.answerDetail);
      });
    }
  }
$scope.answerDetail = $scope.answerDetail();

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
});