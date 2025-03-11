//搜索器
define([
    "esri/widgets/BuildingExplorer",
    "esri/widgets/Expand"
], function (BuildingExplorer, Expand) {

    return {

        initialize: function (view, buildingSYHYM5Layer, buildingSYHYG4Layer, buildingSYHYW1Layer) {
            const buildingExplorer = new BuildingExplorer({
                view: view,
                layers: [
                    buildingSYHYM5Layer,
                    buildingSYHYG4Layer,
                    buildingSYHYW1Layer
                ]
            });
            const buildingExpand = new Expand({
                view: view,
                content: buildingExplorer,
                expandTooltip: "建筑物探测"
            });
            view.ui.add(buildingExpand, "top-right");
        }
    };
});
