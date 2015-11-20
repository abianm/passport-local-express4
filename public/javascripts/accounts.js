(function(){
  var app = angular.module('accountsApp',[]);

  app.controller('AccountController', ['$scope','$http',function($scope,$http){
    this.accounts = {name: 'abian'};
    $http.get('http://localhost:3000/angular/users').then(function(data){
      $scope.account.accounts = data.data.names;
    }, function(){return;});
  
  }]);

  app.controller('refreshControl',function($http,$scope,$interval){
    $scope.currentTime = new Date();
    $interval(function(){
      $scope.currentTime = new Date();
    },1000);
  }); 


})();