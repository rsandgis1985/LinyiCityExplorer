//搜索器
define([
    "esri/widgets/Weather",
    "esri/widgets/Daylight",
    "esri/widgets/Expand"
], function (Weather, Daylight, Expand) {

    return {

        initialize: function (view) {
            /***********************************
             * Add the widgets' UI elements to the view
             ***********************************/
            const weatherExpand = new Expand({
                view: view,
                content: new Weather({
                    view: view
                }),
                expandTooltip: "天气"
            });

            const daylightExpand = new Expand({
                view: view,
                content: new Daylight({
                    view: view
                }),
                expandTooltip: "太阳光"
            });
            view.ui.add([weatherExpand, daylightExpand], "top-right");
        }
    };
});