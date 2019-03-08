/**
 * Created by - liekkas.zeng on 2015/1/7.
 * Url - https://github.com/liekkas/ng-e$scope.charts
 * Customized by - Mesongo on 2017/11/21
 */
angular.module("mammoth.common.echarts", [])
    .directive("echart", [function() {
        return {            
            restrict: "EA",
            scope: {
                option: "=option",
                config: "=config"
            },
            link: function($scope, $element, attrs, ctrl) {
                var theme = ($scope.config && $scope.config.theme) ?
                    $scope.config.theme : "default";
                var opts = {
                    width: (attrs.width || 500),
                    height: (attrs.height || 500)
                };

                $scope.chart = echarts.init($element[0], theme, opts);

                $scope.refreshChart = function () {
                    if ($scope.config && !$scope.config.dataLoaded) {
                        $scope.chart.showLoading();
                    }

                    if ($scope.config && $scope.config.dataLoaded) {
                        $scope.chart.setOption($scope.option);
                        $scope.chart.resize();
                        $scope.chart.hideLoading();
                    }

                    if ($scope.config && $scope.config.event) {
                        if (angular.isArray($scope.config.event)) {
                            angular.forEach($scope.config.event, function(value, key) {
                                for (var e in value) {
                                    $scope.chart.on(e, value[e]);
                                }
                            });
                        }
                    }
                };

                // Custom Parameters - config
                // event - Define the event
                // theme - theme name
                // dataLoaded - Data is loaded
                $scope.$watch(
                    function() { return $scope.config; },
                    function(value) { if (value) { $scope.refreshChart(); } },
                    true
                );

                //Chart options
                $scope.$watch(
                    function() { return $scope.option; },
                    function(value) { if (value) { $scope.refreshChart(); } },
                    true
                );
            }
        };
    }]);