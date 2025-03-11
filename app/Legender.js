//搜索器
define([
    "esri/widgets/Legend",
    "esri/widgets/Expand"
], function (Legend, Expand) {

    return {

        initialize: function (view) {
            //【创建图例】
            const legend = new Legend({
                view: view,
                style: "card"
            });
            const legendExpand = new Expand({
                view: view,
                content: legend,
                expandTooltip: "图例"
            });
            view.ui.add(legendExpand, "bottom-left");
        }
    };
});
