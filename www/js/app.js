(function () {


var app = angular.module('feeder', ['ionic']);

app.controller("feederController", function($scope, $http) {

  $scope.stories = [];

  $scope.loadOlderStories = function() {

    console.log("I'm here");

    var params = [];

    if($scope.stories.length > 0) {
      params['after'] = $scope.stories[$scope.stories.length - 1].name;
    }  

    $http.get("https://www.reddit.com/r/funny/new.json", 
      {params: params})
    .success(function(response) {
      angular.forEach(response.data.children, 
        function(child) {
          $scope.stories.push(child.data);
          console.log(child.data);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.reloadFeeds = function() {
    $scope.stories = [];

    $scope.loadOlderStories();
    // $scope.$broadcast('scroll.refreshComplete');
  }

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
    
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());
