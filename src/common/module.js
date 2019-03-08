(function() {
    "use strict";

    angular.module("mammoth.common", [
        "mammoth.common.providers",
        "mammoth.common.services",
        "mammoth.common.filters",
        "mammoth.common.directives",
        "mammoth.common.controllers",
        "mammoth.common.echarts",
        "mammoth.common.actions",
        "mammoth.common.alerts",
        "mammoth.common.tables",
        "mammoth.common.pagination",
        "mammoth.common.loadingbar"
    ]);
}());
