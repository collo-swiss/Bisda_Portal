(function() {
    "use strict";

    angular.module("mammoth.common.controllers", [])
    .controller("mammoth.common.controllers.export.modal",
        ["$scope", 
        "$rootScope", 
        "$uibModalInstance",
        "mammoth.alerts.services",
        function (
            $scope, $rootScope, 
            $uibModalInstance, alertServices
        ) {
            $scope.file = {
                format: "csv"
            };

            // Dissmisses the modal            
            $scope.cancel = function () {
                $uibModalInstance.dismiss("dismissed");
            };

            $scope.validExportFile = function (argument) {
                return $scope.createExportFileForm.$valid;
            };

            /*
            * Send file detaiks to the exporting controller
            */
            $scope.startExport = function () {
                $scope.createExportFileForm.$submitted = true;

                if($scope.validExportFile()) {
                    $uibModalInstance.close($scope.file);
                } else {
                    $scope.view_alert = alertServices
                        .showErr("Please fill the name of the file!", "Error");
                }
            };
        }
    ]);
}());
