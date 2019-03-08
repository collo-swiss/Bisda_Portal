/*
 * Author - Mesongo Collins
 * Started - 14 June 2015 20:22:05
 * Loader directive
 */


(function () {
    "use strict";

    // Alias the loading bar for various backwards compatibilities since the project has matured:
    angular.module("mammoth.common.loadingbar", [])
        .directive("mammothLoadingBar", [
            "$transitions", "$location",
            "mammoth.auth.services",
            function ($transitions, $location, authServices) {
                return {
                    restrict: "E",
                    replace: true,
                    template: "<div class=''></div>",
                    link: function (scope, elem) {

                        $transitions.onStart({}, function (trans) {
                            elem.addClass("loading");
                            $("body").css("opacity", 0.2);
                        });

                        $transitions.onSuccess({}, function (trans) {
                            elem.removeClass("loading");
                            $("body").css("opacity", 1);
                        });

                        $transitions.onError({}, function (trans) {
                            elem.removeClass("loading");
                            $("body").css("opacity", 1);
                        });
                    }
                };
            }
        ]);
})();