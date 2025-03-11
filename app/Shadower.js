//搜索器
define([
    "esri/widgets/ShadowCast",
    "esri/widgets/Expand"
], function (ShadowCast, Expand) {

    return {

        initialize: function (view) {
            const widget = new ShadowCast({ view });
            const widgetExpand = new Expand({
                view: view,
                content: widget,
                expandTooltip: "阴影分析"
            });
            view.ui.add(widgetExpand, "top-right");
            widget.viewModel.date = new Date("May 1, 2023");
            widget.viewModel.startTimeOfDay = 12 * 3600 * 1000; //3PM (15 * 3600 * 1000ms)
            widget.viewModel.endTimeOfDay = 12 * 3600 * 1000;
            widget.viewModel.thresholdOptions.color = [0, 0, 0, 0];
            //widget.visible = false;
            widget.visibleElements.tooltip = false;
            // widgetExpand.on("click", (event) => {
            //     console.log(event.mapPoint);
            //     if (widgetExpand.expanded==true){
            //         widget.visibleElements.tooltip = true;
            //     }
            //     else{
            //         widget.visibleElements.tooltip = false;
            //     }
            // });
        }
    };
});
