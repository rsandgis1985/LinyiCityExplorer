define([
    "esri/widgets/Sketch/SketchViewModel",
    "esri/widgets/Expand"
], function (SketchViewModel, Expand) {
    var sketchViewModel = null;
    // default values for edge/move operations
    var edgeType = "split";
    var shapeType = "move";
    return {
        initialize: function (view, graphicsLayer) {
            const blue = [82, 82, 122, 0.9];
            const white = [255, 255, 255, 0.8];
            // polygon symbol used for sketching the extruded building footprints
            const extrudedPolygon = {
                type: "polygon-3d",
                symbolLayers: [
                    {
                        type: "extrude",
                        size: 10, // extrude by 10 meters
                        material: {
                            color: white
                        },
                        edges: {
                            type: "solid",
                            size: "3px",
                            color: blue
                        }
                    }
                ]
            };

            // polyline symbol used for sketching routes
            const route = {
                type: "line-3d",
                symbolLayers: [
                    {
                        type: "line",
                        size: "10px",
                        material: {
                            color: white
                        }
                    },
                    {
                        type: "line",
                        size: "3px",
                        material: {
                            color: blue
                        }
                    }
                ]
            };

            // point symbol used for sketching points of interest
            const point = {
                type: "point-3d",
                symbolLayers: [
                    {
                        type: "icon",
                        size: "30px",
                        resource: { primitive: "kite" },
                        outline: {
                            color: blue,
                            size: "3px"
                        },
                        material: {
                            color: white
                        }
                    }
                ]
            };
            // Set-up event handlers for buttons and click events
            const enabledcheckbox = document.getElementById("enabledcheckbox");
            const startbuttons = document.getElementById("startbuttons");
            const actionbuttons = document.getElementById("actionbuttons");
            const edgeoperationbuttons = document.getElementById(
                "edgeoperationbuttons"
            );
            const tooltipOptionsheckbox = document.getElementById(
                "tooltipOptionsheckbox"
            );
            const labelOptionscheckbox = document.getElementById(
                "labelOptionscheckbox"
            );
            const selfsnappingcheckbox = document.getElementById(
                "selfsnappingcheckbox"
            );
            const snappingctrlkey = document.getElementById("snappingctrlkey");
            const featuresnappingcheckbox = document.getElementById(
                "featuresnappingcheckbox"
            );
            // load the default value from the snapping checkbox
            let snappingcheckboxsavedstate = enabledcheckbox.checked ? true : false;
            // define the SketchViewModel and pass in the symbols for each geometry type
            // set the snappingOptions.selfEnabled to the default state
            const sketchViewModel = new SketchViewModel({
                layer: graphicsLayer,
                view: view,
                pointSymbol: point,
                polygonSymbol: extrudedPolygon,
                polylineSymbol: route,
                snappingOptions: {
                    enabled: snappingcheckboxsavedstate,
                    featureSources: [{ layer: graphicsLayer }]
                },
                tooltipOptions: { enabled: true },
                labelOptions: { enabled: true },
                defaultUpdateOptions: {
                    tool: "reshape"
                }
            });
            sketchViewModel.on("update", (event) => {
                if (event.state === "start") {
                    startbuttons.style.display = "none";
                    actionbuttons.style.display = "inline";
                    if (
                        event.graphics[0].geometry.type === "polygon" ||
                        event.graphics[0].geometry.type === "polyline"
                    ) {
                        edgeoperationbuttons.style.display = "inline";
                    }
                }
                if (event.state === "complete") {
                    startbuttons.style.display = "inline";
                    actionbuttons.style.display = "none";
                    edgeoperationbuttons.style.display = "none";
                }
            });

            /**********************************************
             * Drawing UI with configuration
             *********************************************/
            const drawButtons = Array.prototype.slice.call(
                document.getElementsByClassName("starttool")
            );
            const cancelBtn = document.getElementById("cancel");
            const doneBtn = document.getElementById("done");

            // set event listeners to activate sketching graphics
            drawButtons.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    // to activate sketching the create method is called passing in the geometry type
                    // from the data-type attribute of the html element
                    sketchViewModel.create(event.target.getAttribute("data-type"));
                    startbuttons.style.display = "none";
                    actionbuttons.style.display = "inline";
                });
            });

            cancelBtn.addEventListener("click", (event) => {
                sketchViewModel.cancel();
            });
            doneBtn.addEventListener("click", (event) => {
                if (sketchViewModel.updateGraphics.length !== 0) {
                    sketchViewModel.complete();
                } else {
                    sketchViewModel.cancel();
                }
            });

            // Handling the configuration for edge operation
            const noneEdgeBtn = document.getElementById("none-edge-button");
            const splitEdgeBtn = document.getElementById("split-edge-button");
            const offsetEdgeBtn = document.getElementById("offset-edge-button");
            noneEdgeBtn.onclick = this.edgeChangedClickHandler;
            splitEdgeBtn.onclick = this.edgeChangedClickHandler;
            offsetEdgeBtn.onclick = this.edgeChangedClickHandler;

            // Handling the configuration for move operation
            const noneShapeButton = document.getElementById("none-shape-button");
            const moveShapeButton = document.getElementById("move-shape-button");
            noneShapeButton.onclick = this.shapeChangedClickHandler;
            moveShapeButton.onclick = this.shapeChangedClickHandler;

            /**********************************************
            * Configuration UI for snapping
            *********************************************/

            sketchViewModel.watch("snappingOptions.enabled", (newValue) => {
                enabledcheckbox.checked = newValue;
            });

            enabledcheckbox.checked = sketchViewModel.snappingOptions.enabled;
            enabledcheckbox.addEventListener("change", (event) => {
                sketchViewModel.snappingOptions.enabled = event.target.checked
                    ? true
                    : false;
            });

            tooltipOptionsheckbox.checked = sketchViewModel.tooltipOptions.enabled;
            tooltipOptionsheckbox.addEventListener("change", (event) => {
                sketchViewModel.tooltipOptions.enabled = event.target.checked
                    ? true
                    : false;
            });

            labelOptionscheckbox.checked = sketchViewModel.labelOptions.enabled;
            labelOptionscheckbox.addEventListener("change", (event) => {
                sketchViewModel.labelOptions.enabled = event.target.checked
                    ? true
                    : false;
            });

            selfsnappingcheckbox.checked =
                sketchViewModel.snappingOptions.selfEnabled;
            selfsnappingcheckbox.addEventListener("change", (event) => {
                sketchViewModel.snappingOptions.selfEnabled = event.target.checked
                    ? true
                    : false;
            });

            featuresnappingcheckbox.checked =
                sketchViewModel.snappingOptions.featureEnabled;
            featuresnappingcheckbox.addEventListener("change", (event) => {
                sketchViewModel.snappingOptions.featureEnabled = event.target.checked
                    ? true
                    : false;
            });

            // observe the if the CTRL-key got pressed to give the user a visual feedback
            // the logic itself for toggling snapping is in the SketchViewModel
            view.on(["key-down"], (ev) => {
                if (ev.key === "Control") {
                    snappingctrlkey.style.fontWeight = "bold";
                    snappingctrlkey.style.color = "royalblue";
                }
            });
            view.on(["key-up"], (ev) => {
                if (ev.key === "Control") {
                    snappingctrlkey.style.fontWeight = "normal";
                    snappingctrlkey.style.color = "black";
                }
            });
        },

        edgeChangedClickHandler: function (event) {
            edgeType = event.target.value;

            // handle the buttons
            const buttons = document.getElementsByClassName("edge-button");
            for (const button of buttons) {
                button.classList.remove("edge-button-selected");
            }
            this.classList.add("edge-button-selected");
            this.restartUpdateMode({
                reshapeOptions: {
                    edgeOperation: edgeType,
                    shapeOperation: shapeType
                }
            });
        },
        shapeChangedClickHandler: function (event) {
            shapeType = event.target.value;

            // handle the buttons
            const buttons = document.getElementsByClassName("shape-button");
            for (const button of buttons) {
                button.classList.remove("shape-button-selected");
            }
            this.classList.add("shape-button-selected");
            this.restartUpdateMode({
                reshapeOptions: {
                    edgeOperation: edgeType,
                    shapeOperation: shapeType
                }
            });
        },
        restartUpdateMode: function (updateOptions) {
            sketchViewModel.defaultUpdateOptions = {
                ...sketchViewModel.defaultUpdateOptions,
                ...updateOptions
            };

            if (sketchViewModel.activeTool) {
                if (
                    sketchViewModel.activeTool === "transform" ||
                    sketchViewModel.activeTool === "move" ||
                    sketchViewModel.activeTool === "reshape"
                ) {
                    updateOptions.tool = sketchViewModel.activeTool;
                    sketchViewModel.update(
                        sketchViewModel.updateGraphics.toArray(),
                        updateOptions
                    );
                }
            }
        },
        start:function(view){
            const sketchPanelExpand = new Expand({
                view: view,
                content: document.getElementById("sketchPanel"),
                expandIconClass: "esri-icon-authorize",
                expandTooltip: "草图绘制"
            });
            view.ui.add(sketchPanelExpand, "top-right");

            const configurationExpand = new Expand({
                expandIconClass: "esri-icon-settings2",
                expandTooltip: "Show configuration",
                expanded: false,
                view: view,
                content: document.getElementById("configurationDiv")
            });
            view.ui.add(configurationExpand, "bottom-right");
            const configurationInfoDiv = document.getElementById(
                "configurationInfoDiv"
            );
            configurationInfoDiv.addEventListener("click", (event) => {
                configurationExpand.expand();
            });
            view.ui.add(configurationInfoDiv, "bottom-right");
        }

    };
});