(function(angular){
	'use strict';

	//正在热映
  var module = angular.module('moviecat.list',['ngRoute']);

  module.config(['$routeProvider',function($routeProvider) {
  	$routeProvider
  	.when('/:category/:page',{
  		templateUrl:'movie_list/view.html',
  		controller:'movieController'
  	});

  }]);

  module.controller('movieController',[
    '$scope',
    '$http',
    '$routeParams',
    '$route',
    'AppConfig',
    function($scope,$http,$routeParams,$route,AppConfig){
      // console.log(AppConfig);

      var count = AppConfig.pageSize;//每一页放数据的数量
      var page = parseInt($routeParams.page);//页码
      var start = (page-1)*count;//当前页从哪儿开始
      $scope.title = 'Loading...';
      $scope.subjects=[];
      $scope.errorMsg = '';
      $scope.totalCount = 0;
      $scope.totalPages = 0;
      $scope.currentPage = page;//当前页
      
      $http({
        url:AppConfig.listApiAddress + $routeParams.category,
        method:'get',
        params:{
          start:start,
          count:count,
          q:$routeParams.q,  //$routeParams的数据来源：1.路由匹配出啦的 2.问号后面的参数
        }
      }).success(function(info){
        // console.log(info);
        $scope.info = info;
        $scope.title = info.title;
        $scope.subjects=info.subjects;
        $scope.totalCount = info.total;
        $scope.totalPages = Math.ceil($scope.totalCount / count);
      }).error(function(){
        $scope.errorMsg = "数据请求失败";
      });

      //暴露一个更改上一页下一页的行为
      $scope.goPage = function(page){
        if(page>=1&&page<=$scope.totalPages){
          $route.updateParams({page:page})
        }
      };
  }]);

})(angular);