(function() {
    "use strict";

    angular.module("mammoth.common.alerts", [
        "ui.bootstrap"
    ])
    /**
    *  This directive will abstract display of transactional alerts.
    *  Place it right above the <div class="content-body"></div> tag on the page where you
    *  want your alert to appear
    *  Usage:  <mammoth-alerts></mammoth-alerts>
    */
    .directive("mammothAlert",[
        "$rootScope", "$timeout",
        function ($rootScope, $timeout) {
            return {
                restrict: "E",
                replace: true,
                template: "<div ng-show='alert' class='alert alert-main alert-{{alert.type}} fade in push-x-10' ng-click='dismissAlert()'>"+
                "<button type='button' class='close' ng-click='dismissAlert()'>×</button>"+
                "<strong>{{ alert.title }}:</strong> &nbsp; {{ alert.msg }}</div>",
                link: function($scope, $element){                    
                    $scope.dismissAlert = function(){
                        $scope.alert = false;
                    };

                    $rootScope.$on("showAlert", function (event, alert) {
                        $scope.alert = alert;
                        event.stopPropagation();
                        $timeout($scope.dismissAlert, 6000);
                    });
                }
            };
        }
    ])

    /**
    *  This directive will abstract display of transactional alerts.
    *  Place it right above the <div class="content-body"></div> tag on the page where you
    *  want your alert to appear
    *  Usage:  <mammoth-alerts></mammoth-alerts>
    */
    .directive("viewAlert",[function () {
        return {
            restrict: "E",
            replace: true,
            template: "<div ng-show='view_alert' class='alert alert-{{view_alert.type}} fade in push-y-10' ng-click='dismissAlert()'>"+
            "<button type='button' class='close' ng-click='dismissAlert()'>×</button>"+
            "<strong>{{ view_alert.title }}:</strong> &nbsp; {{ view_alert.msg }}</div>",            
            link: function($scope){
                $scope.dismissAlert = function(){
                    $scope.view_alert = false;
                };
            }
        };
    }])

    /**
    *   These are alerts ment to display messages for the system user as they do their
    *   tasks. e.g. a success message to inform the user that an action was successful or not
    *   Usage:
    *   In your controller:
    *   Call the service with the following params:
    *   @message: the message to be shown to user. e.g Transcation failed
    *   @title: the message title to be shown to the user. e.g Error!
    *   These alerts require the <mammoth-alert></mammoth-alert>
    **/

    .factory("mammoth.alerts.services", [
        function () {
            return {
                showMsg: function (message, title, type) {
                    return {"type": type, "msg": message, "title": title};
                },

                showOk: function(message, title) {
                    return this.showMsg(message, title, "success");
                },

                showErr: function(message, title) {
                    return this.showMsg(message, title, "danger");
                },

                showInfo: function(message, title) {
                    return this.showMsg(message, title, "info");
                },

                showWarn: function(message, title) {
                    return this.showMsg(message, title, "warning");
                }
            };
        }
    ]);
}());
