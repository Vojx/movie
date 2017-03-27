(function(angular){
	'use strict';

	//正在热映
  var module = angular.module('moviecat.detail',['ngRoute']);

  module.config(['$routeProvider',function($routeProvider) {
  	$routeProvider
  	.when('/detail/:id',{
  		templateUrl:'movie_detail/view.html',
  		controller:'movieDetailController'
  	});

  }]);

  module.controller('movieDetailController',[
    '$scope',
    '$http',
    '$routeParams',
    '$route',
    'AppConfig',
    function($scope,$http,$routeParams,$route,AppConfig){
      // console.log(AppConfig);
      $scope.loading = false;
      $scope.movie = {};
      var api_address = AppConfig.detailApiAddress + $routeParams.id;

      $http({
        url:api_address,
        method:'get',
      }).success(function(info){
        // console.log(info);
        $scope.movie = info;
        $scope.loading = true;

      }).error(function(){
        console.log('数据获取出错了');
      });
    }
  ]);
})(angular);