angular.module('articles').controller('ArticlesController', ['$scope',
'$routeParams', '$location', 'Authentication', 'Articles',
  function ($scope, $routeParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
  }
]);

//CREATE METHOD IN ANGULAR JS
$scope.create = function () {
  var article = new Articles({
    title: this.title,
    content: this.content
  });

  article.$save(function(response) { //METHOD SEND
    $location.path('articles/' + response._id);
  }, function (errorResponse) {
    $scope.error = errorResponse.data.message;
  });
};

//CREATE METHOD FIND() ANGULARJS
$scope.find = function () {
  $scope.articles = Articles.query();
};

//CREATE METHOD FINDONE() ANGULARJS
$scope.findOne = function () {
  $scope.article = Articles.get({
    articleId: $routeParams.articleId
  });
};

//CREATE METHOD UPDATE IN ANGULAR JS
$scope.update = function () {
  $scope.article.$update(function () {
    $location.path('articles/' + $scope.article._id);
  },function (errorResponse) {
    $scope.error = errorResponse.data.message;
  });
};

//DELETE METHOD ANGULARJS
scope.delete = function (article) {
  if (article) {
    article.$remove(function () {
      for (var i in $scope.articles) {
        if ($scope.articles[i] === article) {
          $scope.articles.splice(i, 1);
        }
      }
    });
  } else {
    $scope.article.$remove(function () {
      $location.path('articles');
    });
  }
};
