(function() {
    "use strict";

    angular.module("mammoth.common.actions", [])
    .factory("xNavigation", [
        function () {
            return {
                minimize: function (action){
                    if(action == 'open'){
                        $(".page-container").removeClass("page-container-wide");
                        $(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
                        $(".x-navigation-minimize").find(".fa").removeClass("fa-indent").addClass("fa-dedent");
                        $(".page-sidebar.scroll").mCustomScrollbar("update");
                    }

                    if(action == 'close'){
                        $(".page-container").addClass("page-container-wide");
                        $(".page-sidebar .x-navigation").addClass("x-navigation-minimized");
                        $(".x-navigation-minimize").find(".fa").removeClass("fa-dedent").addClass("fa-indent");
                        $(".page-sidebar.scroll").mCustomScrollbar("disable",true);
                    }

                    $(".x-navigation li.active").removeClass("active");
                },
                onresize: function () {
                    var inner_port = window.innerWidth || $(document).width();

                    if(inner_port < 1025){
                        $(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
                        $(".page-container").removeClass("page-container-wide");
                        $(".page-sidebar .x-navigation li.active").removeClass("active");


                        $(".x-navigation-horizontal").each(function(){
                            if(!$(this).hasClass("x-navigation-panel")){
                                $(".x-navigation-horizontal").addClass("x-navigation-h-holder").removeClass("x-navigation-horizontal");
                            }
                        });


                    }else{
                        if($(".page-navigation-toggled").length > 0){
                            this.minimize("close");
                        }

                        $(".x-navigation-h-holder").addClass("x-navigation-horizontal").removeClass("x-navigation-h-holder");
                    }
                }
            };
        }
    ])

    //Directive for handling x-navigation control functions
    .directive("xnLogo", [
        "xNavigation",
        function (xNavigation) {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    if($(".page-navigation-toggled").length > 0){
                        xNavigation.minimize("close");
                    }

                    if($(".page-navigation-toggled-hover").length > 0){
                        $(".page-sidebar").hover(function(){
                            $(".x-navigation-minimize").trigger("click");
                        },function(){
                            $(".x-navigation-minimize").trigger("click");
                        });
                    }

                    $(".x-navigation-control").click(function(){
                        $(this).parents(".x-navigation").toggleClass("x-navigation-open");

                        xNavigation.onresize();
                        return false;
                    });

                    $(".x-navigation-minimize").on('click', function(){
                        if($(".page-sidebar .x-navigation").hasClass("x-navigation-minimized")){
                            $(".page-container").removeClass("page-navigation-toggled");
                            xNavigation.minimize("open");
                        }else{
                            $(".page-container").addClass("page-navigation-toggled");
                            xNavigation.minimize("close");
                        }

                        xNavigation.onresize();

                        return false;
                    });

                    $(".x-navigation li > a").click(function(){
                        var li = $(this).parent('li');
                        var ul = li.parent("ul");

                        ul.find(" > li").not(li).removeClass("active");
                    });

                    $(".x-navigation .xn-openable > a").on("click", function(e){
                        if($(this).parent("li").hasClass("active")){
                            $(this).parent("li").removeClass("active");
                        } else {
                            $(".x-navigation .xn-openable").removeClass("active");
                            $(this).parents("li").addClass("active");
                        }

                        //stops the above $(".x-navigation li > a").click()
                        //from removing the active class again
                        e.stopPropagation();
                    });

                    $(".x-navigation li").click(function(event){
                        event.stopPropagation();

                        var li = $(this);

                        if(li.children("ul").length > 0 || li.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0){
                          if(li.hasClass("active")){
                              li.removeClass("active");
                              li.find("li.active").removeClass("active");
                          }else
                              li.addClass("active");

                            xNavigation.onresize();

                            if($(this).hasClass("xn-profile") > 0)
                                return true;
                            else
                                return false;
                        }
                    });

                    $(".xn-icon-button").click(function(e){
                        e.stopPropagation();
                        var button = $(this);

                        button.addClass("active");
                    });

                    $(".xn-icon-button li > a").click(function(){
                        var btn = $(this).closest(".xn-icon-button");
                        btn.removeClass("active");
                    });

                    /* XN-SEARCH */
                    $(".xn-search").on("click",function(){
                        $(this).find("input").focus();
                    });
                    /* END XN-SEARCH */
                }
            };
        }
    ])

    /*---------------------------------------------------------------------
    * PANEL ACTIONS
    ---------------------------------------------------------------------*/
    //Remove panel from dom
    .directive("panelRemove", [
        function () {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    var panel = $element.parents('.panel');

                    var removePanel = function() {
                        panel.remove();
                    };

                    $element.bind('click', removePanel);
                }
            };
        }
    ])

    //Make panel fullscreen
    .directive("panelFullscreen", [
        function () {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    var panel = $element.parents('.panel');

                    var panelFullscreen = function(){
                        if(panel.hasClass("panel-fullscreened")){
                            panel.removeClass("panel-fullscreened").unwrap();
                            panel.find(".panel-body,.chart-holder").css("height","");
                            panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");

                            $(window).resize();
                        } else {
                            var head    = panel.find(".panel-heading");
                            var body    = panel.find(".panel-body");
                            var footer  = panel.find(".panel-footer");
                            var hplus   = 30;

                            if(body.hasClass("panel-body-table") || body.hasClass("padding-0")){
                                hplus = 0;
                            }
                            if(head.length > 0){
                                hplus += head.height()+21;
                            }
                            if(footer.length > 0){
                                hplus += footer.height()+21;
                            }

                            panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);


                            panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');
                            panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");

                            $(window).resize();
                        }
                    };

                    $element.bind('click', panelFullscreen);
                }
            };
        }
    ])

    //Collapse Panel
    .directive("panelCollapse", [
        "xNavigation",
        function (xNavigation) {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    var panel = $element.parents('.panel');

                    var panelCollapse = function(){
                        if(panel.hasClass("panel-toggled")){
                            panel.removeClass("panel-toggled");
                            panel.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");

                            xNavigation.onresize();
                        } else {
                            panel.addClass("panel-toggled");
                            panel.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");

                            xNavigation.onresize();
                        }
                    };

                    $element.bind('click', panelCollapse);
                }
            };
        }
    ])

    //Refresh Panel contants
    .directive("panelRefresh", [
        "$timeout", "xNavigation",
        function ($timeout, xNavigation) {
            return {
                restrict: "C",
                replace: false,
                link: function ($scope, $element) {
                    var panel = $element.parents('.panel');

                    var panelRefresh = function(){
                        if(!panel.hasClass("panel-refreshing")){
                            panel.append('<div class="panel-refresh-layer"><img src="assets/images/loading.gif"/></div>');
                            panel.find(".panel-refresh-layer").width(panel.width()).height(panel.height());
                            panel.addClass("panel-refreshing");

                            //hack before actual data refresh is implemented
                            $timeout(function() {
                                panel.find(".panel-refresh-layer").remove();
                                panel.removeClass("panel-refreshing");
                            }, 2000);
                        }else{
                            panel.find(".panel-refresh-layer").remove();
                            panel.removeClass("panel-refreshing");
                        }

                        xNavigation.onresize();
                    };

                    $element.bind('click', panelRefresh);
                }
            };
        }
    ]);
}());
