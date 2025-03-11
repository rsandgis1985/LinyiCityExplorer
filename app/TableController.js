//搜索器
define([
    "esri/widgets/FeatureTable",
    "esri/widgets/Expand",
    "esri/core/reactiveUtils"
], function (FeatureTable, Expand, reactiveUtils) {

    return {
        initialize: function (view, Layer, appContainer, tableContainer, tableDiv) {
            view.when(() => {
                //【表格控件】
                Layer.outFields = ["*"];
                // Create FeatureTable
                const featureTable = new FeatureTable({
                    view: view, // make sure to pass in view in order for selection to work
                    layer: Layer,
                    tableTemplate: {
                        // autocasts to TableTemplate
                        columnTemplates: [
                            //takes an array of GroupColumnTemplate and FieldColumnTemplate
                            {
                                type: "field",
                                fieldName: "x",
                                label: "x"
                            },
                            {
                                type: "field",
                                fieldName: "y",
                                label: "y"
                            },
                            {
                                type: "field",
                                fieldName: "岩土名称",
                                label: "岩土名称"
                            },
                            {
                                type: "field",
                                fieldName: "地层岩性描述",
                                label: "地层岩性描述"
                            },
                            {
                                type: "field",
                                fieldName: "土壤类型",
                                label: "土壤类型",
                                direction: "asc"
                            }
                        ]
                    },
                    container: tableDiv
                });
                appContainer.removeChild(tableContainer);//默认进行隐藏

                const mainDiv = new Expand({
                    view: view,
                    content: document.getElementById("mainDiv"),
                    expandIconClass: "esri-icon-table",
                    expandTooltip: "属性表"
                });
                view.ui.add(mainDiv, "bottom-left");
                reactiveUtils.watch(
                    () => view.popup.viewModel.active,
                    () => {
                        selectedFeature = view.popup.selectedFeature;
                        if (selectedFeature !== null && view.popup.visible !== false && selectedFeature.layer.title == Layer.title) {
                            featureTable.highlightIds.removeAll();
                            featureTable.highlightIds.add(
                                view.popup.selectedFeature.attributes.objectid
                            );
                            id = selectedFeature.getObjectId();
                        }
                    }
                )
            });
        },
        toggleFeatureTable: function (checkboxEle, appContainer, tableContainer) {
            // Check if the table is displayed, if so, toggle off. If not, display.
            if (!checkboxEle.checked) {
                appContainer.removeChild(tableContainer);
                //labelText.innerHTML = "显示属性表";
            } else {
                appContainer.appendChild(tableContainer);
                //labelText.innerHTML = "隐藏属性表";
            }
        }
    };
});
