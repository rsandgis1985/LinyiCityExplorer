define([
    "esri/widgets/Sketch/SketchViewModel",
    "esri/widgets/Expand"
], function (SketchViewModel, Expand) {

    return {

        initialize: function (view, graphicsLayer) {
            const tentBtn = document.getElementById("tent");
            const canoeBtn = document.getElementById("canoe");
            view
                .when(() => {
                    // This sample uses the SketchViewModel to add points to a
                    // GraphicsLayer. The points have 3D glTF models as symbols.
                    const sketchVM = new SketchViewModel({
                        layer: graphicsLayer,
                        view: view
                    });

                    tentBtn.addEventListener("click", () => {
                        // reference the relative path to the glTF model
                        // in the resource of an ObjectSymbol3DLayer
                        sketchVM.pointSymbol = {
                            type: "point-3d",
                            symbolLayers: [
                                {
                                    type: "object",
                                    resource: {
                                        href: "data/tent.glb"
                                    }
                                }
                            ]
                        };
                        sketchVM.create("point");
                        this.deactivateButtons();
                        tentBtn.classList.add("esri-button--secondary");
                    });

                    canoeBtn.addEventListener("click", () => {
                        // reference the relative path to the glTF model
                        // in the resource of an ObjectSymbol3DLayer
                        sketchVM.pointSymbol = {
                            type: "point-3d",
                            symbolLayers: [
                                {
                                    type: "object",
                                    resource: {
                                        href: "https://developers.arcgis.com/javascript/latest/sample-code/import-gltf/live/canoe.glb"
                                    }
                                }
                            ]
                        };
                        this.deactivateButtons();
                        sketchVM.create("point");
                        canoeBtn.classList.add("esri-button--secondary");
                    });

                    sketchVM.on("create", (event) => {
                        if (event.state === "complete") {
                            sketchVM.update(event.graphic);
                            this.deactivateButtons();
                        }
                    });
                })
                .catch(console.error);

            const models3DExpand = new Expand({
                view: view,
                content: document.getElementById("paneDiv"),
                expandIconClass: "esri-icon-marketplace",
                expandTooltip: "添加3D模型"//glTF
            });
            view.ui.add(models3DExpand, "top-right");
        },
        deactivateButtons: function () {
            const elements = Array.prototype.slice.call(
                document.getElementsByClassName("esri-button")
            );
            elements.forEach((element) => {
                element.classList.remove("esri-button--secondary");
            });
        }
    };
});