(function () {
    "use strict";

    angular.module("mammoth.common.services", ["mammoth.common.providers"])
    //Storage services for using local storage
    .factory("mammoth.storage.services", [
        function() {
            return {
                getItem: function(key) {
                    return JSON.parse(localStorage.getItem(key));
                },
                setItem: function(key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: function(key) {
                    localStorage.removeItem(key);
                },
                dumpScope: function (scope, location) {
                    var dump = {
                        location: location,
                        scope: (_.isUndefined(scope.data) || _.isNull(scope.data)) ? {} : scope.data
                    };
                    this.setItem("dump", dump);
                },
                loadScope: function () {
                    return this.getItem("dump");
                },
                clear: function() {
                    localStorage.clear();
                }
            };
        }
    ])

    /*
    * Services for instatiating object with defualt values
    * On Create - add project, created_by, created_at and updated_at
    * On Update - add updated_at
    */
    .factory("mammoth.objects.services", [
        "mammoth.storage.services", 
        function (storageServices) {
            return { 
                //Ensures an object is created with the following visits
                create: function (object) {
                    object.project = storageServices.getItem("auth.pid");
                    object.created_by = storageServices.getItem("auth.uid");

                    return object;
                }
            };
        }
    ])

    /*
    * Services for accessing basic time(moment) utilities
    */
    .factory("mammoth.moment.services", [
        "moment", 
        function (moment) {
            return { 
                //Return stary of day(midnight) in  Unix Epoch milliseconds
                startOfDay: function (date) {
                    var day = new Date(date);
                    var start_of_day = day.setHours(0,0,0,0);
                    start_of_day = moment(day).valueOf();

                    return start_of_day;
                },
                //Return stary of day(midnight) in  Unix Epoch milliseconds
                endOfDay: function (date) {
                    var day = new Date(date);
                    var end_of_day = day.setHours(24,0,0,0);
                    end_of_day = moment(day).valueOf();

                    return end_of_day;
                },
                //Get a months start and end date
                monthRange: function () {
                    var month_range = {
                        start_date: moment().startOf('month').format('YYYY-MM-DD'),
                        end_date: moment().endOf('month').format('YYYY-MM-DD')
                    };

                    return month_range;
                }
            };
        }
    ])
    //Sevices to handle export of data
    .factory("mammoth.export.services", [
        "$uibModal",
        function($uibModal) {
            return {
                //Modal to handle lead deletion
                exportModal: function() {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: "modal-title",
                        ariaDescribedBy: "modal-body",
                        templateUrl: "common/tpls/export-modal.tpl.html",
                        controller: "mammoth.common.controllers.export.modal"
                    });

                    return modalInstance.result;
                }
            };
        }
    ]);
}());
