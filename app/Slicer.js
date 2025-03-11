//搜索器
define([
    "esri/widgets/Slice",
    "esri/analysis/SlicePlane",
    "esri/widgets/Expand"
], function (Slice, SlicePlane,Expand) {

    return {
        setSliceWidget: function (view, excludedLayers, sliceTiltEnabled, clearPlaneBtn) {
            sliceWidget = new Slice({
                view: view,
                container: "sliceContainer"
            });
            sliceWidget.viewModel.excludedLayers.addMany(excludedLayers);
            sliceTiltEnabled = true;
            sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
            //sliceWidget.viewModel.shape = plane;
            sliceWidget.viewModel.watch("state", (value) => {
                if (value === "ready") {
                    clearPlaneBtn.style.display = "none";
                } else {
                    clearPlaneBtn.style.display = "inherit";
                }
            });
            return [sliceWidget, sliceTiltEnabled]
        },

        setupPropertiesListener: function (sliceWidget, sliceTiltEnabled,resetPlaneBtn,clearPlaneBtn) {
            const plane = new SlicePlane({
                position: {
                    latitude: 35.1,
                    longitude: 118.3,
                    z: -452.28
                },
                tilt: 89.42,
                width: 100,
                height: 100,
                heading: 3.08
            });
            resetPlaneBtn.addEventListener("click", () => {
                document.getElementById("tiltEnabled").checked = true;
                sliceTiltEnabled = true;
                sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
                sliceWidget.viewModel.shape = plane;
            });
            clearPlaneBtn.addEventListener("click", () => {
                sliceWidget.viewModel.clear();
            });
        },
        start: function (view, WebScene, sliceWidget, sliceTiltEnabled,cam) {
            view.when(() => {
                document
                    .getElementById("tiltEnabled")
                    .addEventListener("change", (event) => {
                        sliceTiltEnabled = event.target.checked;
                        sliceWidget.viewModel.tiltEnabled = sliceTiltEnabled;
                    });
                // allow navigation above and below the ground
                WebScene.ground.navigationConstraint = {
                    type: "none"
                };//stay-above|none
                // the webscene has no basemap, so set a surfaceColor on the ground
                WebScene.ground.surfaceColor = "#fff";
                // to see through the ground, set the ground opacity to 0.4
                WebScene.ground.opacity = 1;
                const undergroundBtn = document.getElementById("undergroundBtn");
                const opacityInput = document.getElementById("opacityInput");

                undergroundBtn.addEventListener("click", () => {
                    // slide 1 of the webscene presentation has a viewpoint that is underground
                    view
                        .goTo(cam)
                        .catch((error) => {
                            if (error.name !== "AbortError") {
                                console.error(error);
                            }
                        });
                });

                opacityInput.addEventListener("change", (event) => {
                    WebScene.ground.opacity = event.target.checked ? 0.4 : 1;
                });

                const menu = new Expand({
                    view: view,
                    content: document.getElementById("menu"),
                    expandIconClass: "esri-icon-line-of-sight",
                    expandTooltip: "地层剖面"
                });
                view.ui.add(menu, "top-right");

            })
        }
    };
});
