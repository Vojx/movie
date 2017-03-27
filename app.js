'use strict';


//引入模块的顺序决定了哪个模块先执行
angular.module('moviecat', [
    'ngRoute',
    'moviecat.detail',
    'moviecat.list',
    'directives.auto_focus',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
}])
//配置信息（可更改的）
.constant('AppConfig', {
    pageSize:8,  //每一页放多少条数据
    listApiAddress:'http://api.douban.com/v2/movie/',   //movie_list里面的数据
    detailApiAddress:'http://api.douban.com/v2/movie/subject/',    //movie_detail里面的数据
})
.controller('SearchController',['$scope','$route',function($scope,$route){
    $scope.input = '';
    $scope.search = function(){
        //$route中的updateParams参数很重要，可以更新url中的参数
        $route.updateParams({
            category:'search',
            q:$scope.input
        });
    }
}]);    



// //自动对焦
//     .controller('NavController', [
//         '$scope',
//         '$location',
//         function($scope, $location) {

//             $scope.$location = $location;

//             $scope.$watch('$location.path()', function(now) {

//                 if (now.startsWith('/in_theaters')) {
//                     $scope.type = 'in_theaters';
//                 } else if (now.startsWith('/coming_soon')) {
//                     $scope.type = 'coming_soon';
//                 } else if (now.startsWith('/top250')) {
//                     $scope.type = 'top250';
//                 }

//             });
//         }
//     ]);