/*
* Author - Mesongo Collins
* Started - 22 June 2015 11:30:38
* Bootstrap tables directive
*/

/*
* Expects the following from the controller scope
* @columns - the columns to be displayed
* @rows - the data to be contained in the respective column
* @onSelectedRow - Event handler when a row is selected
*/

(function() {
    "use strict";

    angular.module("mammoth.common.tables", [])
    .directive("bootstrapTable", [
        function () {
            return {
                restrict: "E",
                replace:true,
                scope: {
                    data:"=data",
                    columns:"=columns",
                    onSelectedRow:"&onSelectedRow"
                },
                template: "<table></table>",
                link: function($scope, $element) {
                    /*
                    * Function that gets the selected row
                    * Then calls the onSelectedRow in the controller scope
                    */
                    $scope.selectedRow = function (row) {
                        $scope.$apply(function() {
                            $scope.onSelectedRow({row:row});
                        });                        
                    };

                    /*
                    * Inistantiate the bootstrap element
                    */                    
                    $element.bootstrapTable({
                        //styling
                        classes:"table table-hover",
                        undefinedText:"No Record",
                        //Set booleans
                        sortable:true,
                        showRefresh:true,
                        showToggle:true,
                        showColumns:true,
                        showExport:true,
                        //Set Search
                        search:true,
                        searchAlign: 'left',
                        //pagination
                        pageSize:10,
                        pageNumber:1,
                        pagination:true,
                        pageList:[5,10,15],
                        showPaginationSwitch:true,
                        //Selection
                        checkbox: true,
                        singleSelect:true, 
                        clickToSelect: true,  
                        selectItemName:"selectedItem",                             
                        //Set fuctionality
                        data: $scope.data,
                        columns: $scope.columns,
                        onCheck:$scope.selectedRow
                    });
                }
            };
        }
    ])
    .directive("datatable", [
        function () {
            return {
                restrict: "AC",
                replace:false,
                link: function($scope, $element) {
                    /*
                    * Inistantiate the datatable element
                    */                    
                    $element.dataTable({
                        //scrollY: 300
                    });
                }
            };
        }
    ]);
})();
