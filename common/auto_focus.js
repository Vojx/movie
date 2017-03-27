'use strict';

(function(angular) {
    angular.module('directives.auto_focus', [])
        .directive('autoFocus', ['$location', function($location) {

            var path = $location.path();
            return {
                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {
                    $scope.$location = $location;
                    $scope.$watch('$location.path()', function(now) {
                        var aLink = iElm.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/, '$1');
                        if (now.startsWith(type)) {
                            // 访问的是当前链接
                            iElm.parent().children().removeClass('active'); 
                            iElm.addClass('active');
                        }
                    });

                    // iElm.on('click', function() {
                    //     iElm.parent().children().removeClass('active');
                    //     iElm.addClass('active');
                    // });

                }
            };
        }]);
})(angular);
