// Ionic Starter App
(function(){
  'use strict';
angular.module('starter', ['ionic','cb.x2js']).
run(function($ionicPlatform, $rootScope) {
}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  // Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  // Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Set api token
  if(typeof API_TOKEN !== 'undefined') {
    $httpProvider.defaults.headers.common['Authentication-Token'] = API_TOKEN;
  }
})
.controller("FeedControl", function($http, $scope,$rootScope,x2js,$ionicPlatform) {
  $scope.url="Digite a url";
  $scope.myClick = function(url) {
      $http.get(url)
        .success(function (data) {
             if(!data.error) {
                var json = x2js.xml_str2json(data.toString());

                 //$scope.rssTitle = json.rss.channel.title;
                 //$scope.rssUrl = json.rss.channel.feedUrl;
                 //$scope.rssSiteUrl =json.rss.channel.link._href;

                 $scope.entries =x2js.asArray(json.rss.channel.item);
             } else {
                 window.alert("Erro "+data.error());
                 console.log("Error - "+data.error.message);
                 //write error
             }
         });
  };
  
$scope.browse = function(v) {
    window.open(v, "_system", "location=yes");
}
      $ionicPlatform.ready(function() {

            console.log("Started up!!");

            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                window.StatusBar.styleDefault();
            }
                //google.load("feeds", "1",{callback:$scope.init});


        });
});
}());
