(function () {
    "use strict";

    angular.module("mammoth.common.providers", [])
    
    .provider("mammoth.common.providers.requests", function () {

        this.$get = ["$http", "SERVER_URL", function ($http, SERVER_URL) {
            return {
                api_url: SERVER_URL,

                makeUrl: function (uri_fragment) {
                    return this.api_url + uri_fragment;
                },

                callApi: function (method, uri_fragment, data, response_type) {
                    if (["GET", "POST", "DELETE", "PATCH"].indexOf(method) === -1){
                        throw "HTTP method: " + method + " not supported";
                    }

                    var url = this.makeUrl(uri_fragment);
                    var http_options = {
                        url: url,
                        method: method
                    };

                    if (!_.isUndefined(data)) {
                        if (method === "GET") {
                            var params = this.makeParams(data);
                            http_options.url += "?";
                            http_options.url += params;
                        } else if (method !== "DELETE") {
                            http_options.data = data;
                        }
                    }

                    //Mainly used to recieve files as blobs
                    if (!_.isUndefined(response_type)) {
                        http_options.responseType = response_type;                        
                    }
                    
                    return $http(http_options);
                },

                /**
                 * usage:
                 * var t = {q: "text", p:"te"}
                 * var y = makeParams(t)
                 * // returns q=text&p=te
                 */
                makeParams: function (filters) {
                    if (_.isUndefined(filters)) {
                        throw "Filters not provided";
                    }

                    var query_parameters = [];

                    if (!_.isObject(filters)) {
                        throw "Provided filters parameter is not an object";
                    }

                    query_parameters = _.map(filters, function(value, name) {
                        if (!_.isUndefined(value)) {
                            return name + "=" + value;
                        }
                    });

                    return query_parameters.join("&");
                }
            };
        }];
    });

}());