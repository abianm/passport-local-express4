(function(){
  var app = angular.module('accountsApp',[]);

  app.controller('AccountController', ['$scope','$http',function($scope,$http){
    this.accounts = {name: 'abian'};
    $http.get('http://localhost:3000/angular/users').then(function(data){
      $scope.account.accounts = data.data.names;
    }, function(){return;});
  
  }]);


})();