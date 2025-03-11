//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {

        initialize: function (view) {
            const viewingMode = new Expand({
                view: view,
                content: document.getElementById("viewingModeId"),
                expandTooltip: "场景模式"
            });
            view.ui.add(viewingMode, "bottom-right");
        },
        LayerController: function (view, layerStack) {
            view.map.removeAll()
            if (view.viewingMode === "global") {
                var layerArray = layerStack.slice(1);//如果是全局场景，则不加载体素图层
            }
            else {
                var layerArray = layerStack;
            }
            for (let i = 0; i < layerArray.length; i++) {
                view.map.add(layerArray[i]);
            }
        }

    };
});
