demoApp.controller('MainController', function ($scope, $route, $routeParams, $location, $templateCache, $rootScope, GetCategories, SearchService) {

  $scope.myInterval = 500;

  var slides = $scope.slides = [];
  $scope.addSlide = function(newURL) {
    slides.push({
      image: 'app/partials/' + newURL,
      text: ['More','Extra','Lots of','Surplus'][slides.length % 2] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
    });
  };
  var templates = [{path:'products.html'},{path:'detail.html'}];
  for (var i=0; i<2; i++) {
    $scope.addSlide(templates[i].path);
  }





  $scope.breadcrumbMiddle = '';
  $scope.makeBreadCrumb = function(breadcrumbMiddle){
    return '<div class="headerBar"><p><img src="assets/images/exp-logo.png" /></p><div id="breadcrumb"><ul class="breadcrumb"><li><a href="#">Customer Support</a></li>' + breadcrumbMiddle + '</ul></div></div>';
  }

  $scope.breadcrumb = '';
  $scope.breadcrumb = $scope.makeBreadCrumb('');

  /*<li><a href="#">Home</a> <span class="divider">/</span></li>\
      <li><a href="#/product_' + $routeParams.prodID + '">Product</a> <span class="divider">/</span></li>\
      <li><a href="#/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '">Category</a> <span class="divider">/</span></li>\
      <li class="active">Article Detail</li>';*/

  $scope.updateURL = function(newURL){
    $location.path(newURL).replace();
  }
  
  $scope.products = GetCategories;

  $scope.manageVis = function(id){
    //console.log(id);
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
    //$location.path('product_'+id);
    //$location.search('product',id);
    //$location.hash('product_' + id).replace();
    //$location.path('product_' + id).replace().notify(false);
    if(id != 0){
      $scope.breadcrumbMiddle = '<span class="divider"> / </span><li><a href="#/product_' + $routeParams.prodID + '">' + $routeParams.prodName + '</a></li>';
      $scope.breadcrumb = $scope.makeBreadCrumb($scope.breadcrumbMiddle);
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

  $scope.answerDetail = function (ansID) {
    $routeParams.ansID = ansID;
    $scope.loadingIcon = '<i class="icon-refresh"></i> Loading...';
    $scope.answerDetail = false;
    //$scope.answerDetail[0]['Related'] = false;
    //$scope.answerDetail['Title'] = "Loading...";
    //$scope.answerDetail[0] = {};
    //$scope.answerDetail[0]['Title'] = "Loading...";
    kfMethod = 'getFullAnswersAngularAjax';
    $scope.newDetail = $scope.svc.answer({ans:$routeParams.ansID, kfMethod:kfMethod}).getAnswer(function(detail) {
      detail['prodID'] = $routeParams.prodID;
      detail['catID'] = $routeParams.catID;
      detail['ansID'] = $routeParams.ansID;
      $scope.answerDetail = detail;

      $scope.breadcrumbMiddle = '<span class="divider"> / </span><li><a href="#/product_' + $routeParams.prodID + '/category_' + $routeParams.catID + '/detail_' + $routeParams.ansID + '">' + detail['Title'] + '</a></li>';
      $scope.breadcrumb = $scope.makeBreadCrumb($scope.breadcrumbMiddle);
      $scope.relatedText = "<strong>Related Answers:</strong>";
      $scope.loadingIcon = '';
    });
  }
  if($routeParams.ansID){
    $scope.answerDetail = $scope.answerDetail();
  }

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