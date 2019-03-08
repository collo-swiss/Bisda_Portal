(function () {
    "use strict";

    angular.module("mammoth.common.filters", [])
    .filter("titleCase", [
        function () {
            return function (word) {
                word += "";
                return word.charAt(0).toUpperCase() + word.slice(1);
            };
        }
    ])
    .filter("humanizeBool", [
        function () {
            return function (bool) {
                var text="NO";

                if (bool) {
                    text = "YES";
                } else {
                    text = "NO";
                }

                return text;
            };
        }
    ])
    .filter("humanizeUnderscore", [
        function () {
            return function (underscored_word) {
                var text = "";

                if (underscored_word) {
                    text = underscored_word.replace(/_/g, " ");
                }

                return text;
            };
        }
    ])
    /*
    * Formats CSV data and returns data with:
    * @headers - The csv column names
    * @items - The csv rows as objects
    */
    .filter("csvToData", [
        function() {
            return function(input) {
                var data = {};
                var items = [];

                var rows = input.split("\n");
                var headers = rows[0].split(",");

                var headings = _.map(headers, function (header) {
                    return {
                        key: header.replace(/[\n\r]+/g, ""),
                        matched: false
                    };
                });

                rows = _.drop(rows, 1);

                _.forEach(rows, function(row) {
                    var values = row.split(",");

                    var obj = {};
                    _.forEach(values, function(value, key) {
                        if(headers[key]) {
                            headers[key] = headers[key].replace(/[\n\r]+/g, "");
                            obj[headers[key]] = value.replace(/[\n\r]+/g, "");
                        }
                    });

                    items.push(obj);
                });
                
                data.items = items;
                data.headers = headings; //headers;

                return data;
            };
        }
    ]);
}());
