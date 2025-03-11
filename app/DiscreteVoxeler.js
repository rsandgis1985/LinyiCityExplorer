//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {

        initialize: function (view) {
            const infoDiv = new Expand({
                view: view,
                content: document.getElementById("infoDiv1"),
                expandIconClass: "esri-icon-collection",
                iconNumber: 1,
                mode:"drawer",
                expandTooltip: "体素离散化"
            });
            view.ui.add(infoDiv, "top-right");
            view.map.when(function () {
                const vxlLayer = view.map.allLayers.find(
                    (layer) => layer.type === "voxel"
                );
                view.whenLayerView(vxlLayer).then((layerView) => {
                    const infoDiv = document.getElementById("infoDiv1");
                    const existingUniqueValuesList = document.getElementById(
                        "existingUniqueValuesList"
                    );
                    vxlLayer.renderMode = "volume";
                    let contItem = 0;
                    let uniqueValuesCount = 0;
                    let currentVariableStyle = null;
                    let selectedIndexColor = 0;
                    vxlLayer.currentVariableId = 0;
                    currentVariableStyle = vxlLayer.getVariableStyle(null);
                    const currentVariable = document.getElementById("currentVariable");
                    currentVariable.innerHTML = currentVariableStyle.label;
                    uniqueValuesCount = currentVariableStyle.uniqueValues.length;
                    /**
                     * Replace special characters that are reserverd characters in HTML.
                     **/
                    replaceSpecialCharacters = function (stringToChange) {
                        let escapedString = stringToChange
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#39;");
                        return escapedString;
                    };
                    createUniqueValuesItem = function (uniqueValueIndex, uniqueValue) {
                        const itemList = document.createElement("calcite-list-item");
                        const itemInput = document.createElement("calcite-input");
                        const itemAction = document.createElement("calcite-action");
                        const divColor = document.createElement("div");
                        const btnColor = document.createElement("button");
                        const variableLabel = document.getElementById("variableLabel");
                        itemList.label = uniqueValue.label;
                        itemInput.scale = "s";
                        itemInput.prefixText = "标注";
                        itemInput.placeholder = "Label";
                        itemInput.value = uniqueValue.label;
                        itemInput.type = "text";
                        itemInput.id = "label_" + uniqueValueIndex.toString();
                        itemAction.icon = uniqueValue.enabled
                            ? "toggle-on"
                            : "toggle-off";
                        itemAction.slot = "actions-end";
                        itemAction.scale = "s";
                        itemAction.textEnabled = true;
                        itemAction.text = "开启";
                        btnColor.classList.add("btn-color-picker");
                        btnColor.id = "btnColor_" + uniqueValueIndex.toString();
                        btnColor.style.background = uniqueValue.color;
                        divColor.innerHTML = "颜色:&nbsp;&nbsp;";
                        divColor.classList.add("div-color-picker");
                        existingUniqueValuesList.appendChild(itemList);
                        /**
                         * Updating the label of a unique value
                         **/
                        itemInput.addEventListener("calciteInputChange", function () {
                            uniqueValue.label = itemInput.value;
                            itemList.label = itemInput.value;
                            //A unique variable can have a label with special characters that are reserved characters in HTML.
                            //In order to display it properly in HTML, it is important to replace it with it's corresponding entity name.
                            let escapedLabel = replaceSpecialCharacters(uniqueValue.label);
                            variableLabel.innerHTML = escapedLabel;
                        });
                        itemAction.onclick = function () {
                            //Whether or not to render the unique value.
                            uniqueValue.enabled = uniqueValue.enabled ? false : true;
                            itemAction.icon = uniqueValue.enabled
                                ? "toggle-on"
                                : "toggle-off";
                        };
                        itemList.appendChild(itemAction);
                        itemList.appendChild(itemInput);
                        itemList.appendChild(divColor);
                        divColor.appendChild(btnColor);
                        /**
                         * Updating the color of a unique value by clicking on the color box
                         **/
                        btnColor.onclick = function () {
                            let escapedLabel = replaceSpecialCharacters(uniqueValue.label);
                            const colorPickerContainer = document.getElementById(
                                "colorPickerContainer"
                            );
                            const colorPicker = document.getElementById("colorPicker");
                            variableLabel.innerHTML = escapedLabel;
                            colorPickerContainer.style.display =
                                colorPickerContainer.style.display === "none"
                                    ? "block"
                                    : colorPickerContainer.style.display;
                            colorPicker.value = uniqueValue.color.toHex();
                            selectedIndexColor = uniqueValueIndex;
                        };
                    };
                    resetUniqueValues = function () {
                        while (existingUniqueValuesList.hasChildNodes()) {
                            existingUniqueValuesList.removeChild(
                                existingUniqueValuesList.firstChild
                            );
                        }
                        colorPickerContainer.style.display = "none";
                        for (let i = 0; i < uniqueValuesCount; i++) {
                            createUniqueValuesItem(
                                i,
                                currentVariableStyle.uniqueValues.getItemAt(i)
                            );
                        }
                    };
                    resetUniqueValues();
                    colorPicker.addEventListener(
                        "calciteColorPickerChange",
                        function (e) {
                            const uniqueValue =
                                currentVariableStyle.uniqueValues.getItemAt(
                                    selectedIndexColor
                                );
                            const btnColor = document.getElementById(
                                "btnColor_" + selectedIndexColor.toString()
                            );
                            btnColor.style.background = colorPicker.value;
                            uniqueValue.color = colorPicker.value;
                        }
                    );
                    closeButton.onclick = function () {
                        colorPickerContainer.style.display = "none";
                    };
                });
            });
        }
    };
});