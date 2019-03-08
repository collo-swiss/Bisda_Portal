(function() {
    "use strict";

    angular.module("mammoth.common.directives", [])
    /*
    * Adds an asterick to any required field label
    */
    .directive("required", [
        function () {
            return {
                restrict: "A",
                replace: false,
                link: function($scope, $element) {
                    // insert asterisk after elment
                    $element.prev("label").append(" <span class='required'>*</span>");
                }
            };
        }
    ])
   
    /*
    * Ensures two model fields are equally
    */
    .directive("equals", [
        function () {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=equals"
                },
                link: function($scope, $element, $attributes, ngModel) {

                    ngModel.$validators.equals = function(modelValue) {
                        return angular.equals(
                            modelValue, $scope.otherModelValue
                        );
                    };

                    $scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        }
    ])

    /*
    * Replaces ng-class with the corresponding bootstrap class
    */
    .directive("formGroup", [
        "$timeout",
        function ($timeout) {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    $scope.processValidator = function(ngClass, bsClass) {
                        $timeout(function() {
                            var input = $element.find("input[ng-model],textarea[ng-model],select[ng-model]");

                            $scope.$watch(function() {
                                return input.hasClass(ngClass) && input.hasClass("ng-dirty");
                            }, function(isValid) {
                                $element.toggleClass(bsClass, isValid);
                            });
                        });
                    };
                    
                    $scope.processValidator("ng-valid", "has-success");
                    $scope.processValidator("ng-invalid", "has-error");
                }
            };
        }
    ])

    /**
    *  This directive will abstract display of breadcrumbs.
    *  Place it right above the <div class="content-body"></div> tag on the page where you
    *  want your alert to appear
    *  Usage:  <mammoth-alerts></mammoth-alerts>
    */
    .directive("mammothLabel",
        ["$rootScope",
        function ($rootScope) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    type: "=type",
                    content: "=content"
                },
                template: "<span class='label label-{{type}}'>{{label}}</span>",
                link: function ($scope) {
                    $scope.label = _.capitalize($scope.content);
                }
            };
        }
    ])

    /**
    *  This directive will abstract display of breadcrumbs.
    *  Place it right above the <div class="content-body"></div> tag on the page where you
    *  want your alert to appear
    *  Usage:  <mammoth-alerts></mammoth-alerts>
    */
    .directive("breadcrumb",
        ["$rootScope",
        function ($rootScope) {
            return {
                restrict: "E",
                replace: true,
                template: "<ul class='breadcrumb'>"+
                    "<li><a href='#'>Home</a></li>"+
                    "<li class='active'>Dashboard</li>"+
                "</ul>"
            };
        }
    ])

    /*
    * This is the directive for making an element scrollable
    * It relies on the mCustomScrollbar plugin
    */
    .directive("scroll", [
        function () {
            return {
                restrict: "C",
                replace: false,
                link: function($scope, $element) {
                    $element.mCustomScrollbar({
                        axis:"y",
                        theme:"dark-3",
                        autoHideScrollbar: false,
                        scrollInertia: 10,
                        advanced: {
                            autoScrollOnFocus: true
                        }
                    });
                }
            };
        }
    ])

    .directive("convertToNumber", function() {
        return {
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return val ? parseInt(val, 10) : null;
                });
                ngModel.$formatters.push(function(val) {
                    return val ? "" + val : null;
                });
            }
        };
    })
    
    /*
    * Common range-filters
    */
    .directive("rangeFilter", [
        "$rootScope", "$timeout", "moment",
        function ($rootScope, $timeout, moment) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    "search":"&",
                    "filters":"=",
                    "range_filter":"=rangeFilter"
                },
                templateUrl: "common/tpls/range-filter.tpl.html",
                link: function ($scope, $elem, $attrs) {
                    //Quick temporary fix for $scope.$apply
                    $scope.fixSearch = function () {
                        $timeout(function() {
                              $scope.search();
                        }, 0);
                    };

                    $scope.setRangeFilter = function () {
                        switch ($scope.range_filter) {
                            case "all":
                                $scope.filters = _.omit($scope.filters, ["updated_after", "updated_before"]);
                                break;
                            case "this_month":
                                $scope.filters = _.omit($scope.filters, ["updated_before"]);
                                $scope.filters.updated_after = moment().startOf('month').format('YYYY-MM-DD');
                                break;
                            case "last_month": 
                                var last_month = moment().subtract(1, "months");
                                $scope.filters.updated_after = last_month.startOf('month').format('YYYY-MM-DD');
                                $scope.filters.updated_before = moment().startOf('month').format('YYYY-MM-DD');
                                break;
                            case "this_week":
                                $scope.filters.updated_after = moment().startOf('week').format('YYYY-MM-DD');
                                $scope.filters.updated_before = moment().endOf('week').format('YYYY-MM-DD');
                                break;
                            case "today":
                                $scope.filters = _.omit($scope.filters, ["updated_before"]);
                                $scope.filters.updated_after = moment().format('YYYY-MM-DD');
                                break;

                            default: 
                                $scope.filters = _.omit([$scope.filters, "updated_after", "updated_before"]);
                        }

                        $scope.fixSearch();
                    };
                }
            };
        }
    ])

    /*
    * Common date-filters
    */
    .directive("dateFilter", [
        "$rootScope", "$timeout", "moment",
        "mammoth.alerts.services",
        function ($rootScope, $timeout, moment, alertServices) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    "search":"&",
                    "filters":"="
                },
                templateUrl: "common/tpls/date-filter.tpl.html",
                link: function ($scope, $elem, $attrs) {
                    $scope.updated_after_options = {
                        showWeeks: false
                    };

                    $scope.updated_before_options = {
                        showWeeks: false
                    };

                    //Quick temporary fix for $scope.$apply
                    $scope.fixSearch = function () {
                        $timeout(function() {
                              $scope.search();
                        }, 0);
                    };

                    $scope.setCreatedAfterFilter = function () {
                        console.log($scope.updated_after);
                        if(!_.isNull($scope.updated_after)) {                            
                            var is_valid = moment($scope.updated_after)
                                .isSameOrBefore($scope.updated_before);
                            if (is_valid) {
                                $scope.filters.updated_after = moment($scope.updated_after)
                                    .subtract(1, "days").format("YYYY-MM-DD");
                                $scope.fixSearch();
                            } else {
                                $scope.alert = alertServices
                                    .showErr("From date should be less than To", "Error");
                                $rootScope.$emit("showAlert", $scope.alert);
                            }
                        }
                    };

                    $scope.setCreatedBeforeFilter = function () {
                        if(!_.isNull($scope.updated_before)) {
                            var is_valid = moment($scope.updated_before)
                                .isSameOrAfter($scope.updated_after);
                            if (is_valid) {
                                $scope.filters.updated_before = moment($scope.updated_before)
                                    .add(1, "days").format("YYYY-MM-DD");
                                $scope.fixSearch();
                            } else {
                                $scope.alert = alertServices
                                    .showErr("To date should be greater than From", "Error");
                                $rootScope.$emit("showAlert", $scope.alert);
                            }
                        }
                    };
                }
            };
        }
    ])

    /*
    * Common location-filters
    */
    .directive("locationFilter", [
        "$timeout",
        "mammoth.teams.services",
        "mammoth.areas.services",
        "mammoth.regions.services",
        "mammoth.storage.services",
        function (
            $timeout,
            teamServices, areaServices,
            regionServices, storageServices
        ) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    "search":"&",
                    "filters":"="
                },
                templateUrl: "common/tpls/location-filter.tpl.html",
                link: function ($scope, $elem, $attrs) {
                    $scope.team = {};
                    $scope.area = {};
                    $scope.region = {};
                    
                    //Searches for regions from api
                    $scope.getRegions = regionServices.search;
                    //Searches for areas from api
                    $scope.getAreas = areaServices.searchRegionAreas;
                    //Searches for teams from api
                    $scope.getTeams = teamServices.searchAreaTeams;

                    $scope.current_user = storageServices.getItem("auth.user");

                    $scope.fixSearch = function () {
                        $timeout(function() {
                              $scope.search();
                        }, 0);
                    };

                    $scope.setFilterRegion = function (region) {
                        $scope.filters = _.omit($scope.filters, ["area", "team"]);
                        $scope.area = {};
                        $scope.team = {};
                        $scope.region = region;
                        $scope.filters.region = region.id;
                        $scope.fixSearch();
                    };

                    $scope.setFilterArea = function (area) {
                        $scope.filters = _.omit($scope.filters, ["team"]);
                        $scope.team = {};
                        $scope.area = area;
                        $scope.filters.area = area.id;
                        $scope.fixSearch();
                    };

                    $scope.setFilterTeam = function (team) {
                        $scope.team = team;
                        $scope.filters.team = team.id;
                        $scope.fixSearch();
                    };
                }
            };
        }
    ])

    /*
    * Common status filter
    */
    .directive("statusFilter", [
        "$timeout",
        "mammoth.storage.services",
        function ($timeout, storageServices) {
            return {
                restrict: "EA",
                replace: true,
                scope: {
                    search:"&",
                    filters:"="
                },
                templateUrl: "common/tpls/status-filter.tpl.html",
                link: function ($scope, $elem, $attrs) {
                    $scope.current_user = storageServices.getItem("auth.user");                

                    //Quick temporary fix for $scope.$apply
                    $scope.fixSearch = function () {
                        $timeout(function() {
                              $scope.search();
                        }, 0);
                    };
                }
            };
        }
    ])

    /**
    * @author xialei <xialeistudio@gmail.com>
    */
    .directive('icheck', [
        function () {
            return {
                restrict: "EA",
                transclude: true,
                require: "ngModel",
                replace: true,
                scope: {
                    "ngChange":"&",
                    "ngTrueValue":"=",
                    "ngFalseValue":"="
                },
                template: '<div class="icheck">' +
                    '<div class="checkbox"></div>' +
                    '<div class="label" ng-transclude></div>' +
                '</div>',
                link: function ($scope, $elem, attrs, ngModel) {
                    var box = angular.element($elem[0].querySelector('.checkbox'));

                    $elem.bind("click", function (event) {
                        event.stopPropagation();
                        box.toggleClass("checked");
                        
                        if (box.hasClass("checked")) {
                            ngModel.$setViewValue($scope.ngTrueValue);
                        } else {
                            ngModel.$setViewValue($scope.ngFalseValue);
                        }
                    });

                    ngModel.$render = function () {
                        if (ngModel.$viewValue) {
                            box.addClass("checked");
                        } else {
                            box.removeClass("checked");
                        }
                    };

                    ngModel.$isEmpty = function(value) {
                        return value === false;
                    };

                    ngModel.$setViewValue($scope.ngFalseValue);
                    ngModel.$validate();
                }
            };
        }
    ])
    .directive("fileReader", [
        "$filter", "$rootScope",
        "mammoth.alerts.services",
        function($filter, $rootScope, alertServices) {
            return {
                restrict: "EA",
                scope: {
                    fileName: "=",
                    fileReader: "="
                },
                link: function($scope, $element) {
                    $element.bind("change", function (event) {
                        var files = event.target.files;

                        if (files.length) {
                            var file = files[0];
                            var reader = new FileReader();

                            reader.onload = function(e) {
                                var contents = e.target.result;

                                contents = $filter("csvToData")(contents);

                                $scope.$apply(function() {
                                    $scope.fileName = file.name;
                                    $scope.fileReader = contents;
                                });
                            };

                            reader.readAsText(file);
                        } else {
                            $scope.alert = alertServices
                                .showOk("No file selected", "Error");
                            $rootScope.$emit("showAlert", $scope.alert);
                        }
                    });
                }
            };
        }
    ]);
}());
