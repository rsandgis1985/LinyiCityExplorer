//搜索器
define([
    "esri/layers/voxel/VoxelSlice",
    "esri/layers/voxel/VoxelDynamicSection",
    "esri/widgets/Expand"
], function (VoxelSlice, VoxelDynamicSection, Expand) {

    return {

        initialize: function (view) {
            const infoDiv = new Expand({
                view: view,
                content: document.getElementById("infoDiv2"),
                expandIconClass: "esri-icon-collection",
                iconNumber: 2,
                mode:"drawer",
                expandTooltip: "体素剖切"
            });
            view.ui.add(infoDiv, "top-right");
            view.map.when(function () {
                const vxlLayer = view.map.allLayers.find(
                    (layer) => layer.type === "voxel"
                );
                view.whenLayerView(vxlLayer).then((layerView) => {
                    vxlLayer.renderMode = "volume";
                    const vxlVolume = vxlLayer.getVolume(null);
                    const volSize = vxlVolume.sizeInVoxels;
                    const volType = vxlVolume.volumeType;
                    let xSlice, ySlice, zSlice;
                    const content = document.getElementById("content2");
                    const sliceXAxisSlider =
                        document.getElementById("sliceXAxisSlider");
                    const sliceYAxisSlider =
                        document.getElementById("sliceYAxisSlider");
                    const sliceZAxisSlider =
                        document.getElementById("sliceZAxisSlider");
                    const customSliceButton =
                        document.getElementById("customSliceButton");
                    let countSlice = vxlLayer.getVolumeStyle(null).slices.length;
                    const volumeValues = document.getElementById("volumeValues");
                    const newSliceXAxisInput =
                        document.getElementById("newSliceXAxisInput");
                    const newSliceYAxisInput =
                        document.getElementById("newSliceYAxisInput");
                    const newSliceZAxisInput =
                        document.getElementById("newSliceZAxisInput");
                    const newOrientationInput = document.getElementById(
                        "newOrientationInput"
                    );
                    const newTiltInput = document.getElementById("newTiltInput");
                    /**
                     * Updating the point, orientation and tilt of a slice
                     **/
                    function updateNewSlice() {
                        const newPoint = [
                            newSliceXAxisInput.value,
                            newSliceYAxisInput.value,
                            newSliceZAxisInput.value
                        ];
                        const nSlice = vxlLayer
                            .getVolumeStyle(null)
                            .slices.getItemAt(countSlice - 1);
                        nSlice.point = newPoint;
                        nSlice.orientation = newOrientationInput.value;
                        nSlice.tilt = newTiltInput.value;
                    }
                    //A voxel layer can have multiple slices. Each slice is represented by orientation, tilt and point.
                    xSlice = new VoxelSlice({
                        orientation: 270,
                        tilt: 90,
                        point: [volSize[0], 0, 0]
                    });
                    ySlice = new VoxelSlice({
                        orientation: 180,
                        tilt: 90,
                        point: [0, 0, 0]
                    });
                    zSlice = new VoxelSlice({
                        orientation: 0,
                        tilt: 0,
                        point: [0, 0, volSize[2]]
                    });
                    vxlLayer.getVolumeStyle(null).slices = [xSlice, ySlice, zSlice];
                    sliceXAxisSlider.max = volSize[0];
                    sliceXAxisSlider.value = volSize[0];
                    sliceXAxisSlider.addEventListener(
                        "calciteSliderInput",
                        function () {
                            const newPoint = [sliceXAxisSlider.value, 0, 0];
                            const xslc = vxlLayer.getVolumeStyle(null).slices.getItemAt(0);
                            xslc.point = newPoint;
                        }
                    );
                    sliceYAxisSlider.max = volSize[1];
                    sliceYAxisSlider.value = 0;
                    sliceYAxisSlider.addEventListener(
                        "calciteSliderInput",
                        function () {
                            const newPoint = [0, sliceYAxisSlider.value, 0];
                            const yslc = vxlLayer.getVolumeStyle(null).slices.getItemAt(1);
                            yslc.point = newPoint;
                        }
                    );
                    sliceZAxisSlider.max = volSize[2];
                    sliceZAxisSlider.value = volSize[2];
                    sliceZAxisSlider.addEventListener(
                        "calciteSliderInput",
                        function () {
                            const newPoint = [0, 0, sliceZAxisSlider.value];
                            const zslc = vxlLayer.getVolumeStyle(null).slices.getItemAt(2);
                            zslc.point = newPoint;
                        }
                    );
                    newSliceXAxisInput.max = volSize[0];
                    newSliceYAxisInput.max = volSize[1];
                    newSliceZAxisInput.max = volSize[2];
                    customSliceButton.onclick = () => {
                        const newSliceContent =
                            document.getElementById("newSliceContent");
                        let newSlice = null;
                        newSliceXAxisInput.value = Math.floor(volSize[0] / 2);
                        newSliceYAxisInput.value = Math.floor(volSize[1] / 2);
                        newSliceZAxisInput.value = Math.floor(volSize[2] / 2);
                        newOrientationInput.value = 190;
                        newTiltInput.value = 45;
                        if (countSlice <= 3) {
                            volumeValues.innerHTML = `容量 (${volType}): [${volSize[0]}, ${volSize[1]}, ${volSize[2]}]`;
                            //Getting the volume type will help to determine how the point is represented.
                            //Point is represented as X,Y,Z if a Volume Type is [X,Y,Z] or [X,Y,Z,T] and represented as X,Y,T if Volume Type is [X,Y,T].
                            newSliceZAxisInput.prefixText =
                                volType === "xyt" ? "时间轴" : "高度轴";
                            customSliceButton.iconStart = "trash";
                            customSliceButton.innerHTML = "删除剖切";
                            newSlice = new VoxelSlice({
                                orientation: newOrientationInput.value,
                                tilt: newTiltInput.value,
                                point: [
                                    newSliceXAxisInput.value,
                                    newSliceYAxisInput.value,
                                    newSliceZAxisInput.value
                                ]
                            });
                            vxlLayer.getVolumeStyle(null).slices.add(newSlice);
                            newSliceContent.classList.remove("displaynone");
                        } else {
                            customSliceButton.iconStart = "plus-circle";
                            customSliceButton.innerHTML = "添加剖切";
                            //A slice can be deleted from the collection by using the removeAt method and passing it's index.
                            vxlLayer.getVolumeStyle(null).slices.removeAt(countSlice - 1);
                            newSliceContent.classList.add("displaynone");
                        }
                        countSlice = vxlLayer.getVolumeStyle(null).slices.length;
                    };
                    newSliceXAxisInput.addEventListener(
                        "calciteInputChange",
                        function () {
                            updateNewSlice();
                        }
                    );
                    newSliceYAxisInput.addEventListener(
                        "calciteInputChange",
                        function () {
                            updateNewSlice();
                        }
                    );
                    newSliceZAxisInput.addEventListener(
                        "calciteInputChange",
                        function () {
                            updateNewSlice();
                        }
                    );
                    newOrientationInput.addEventListener(
                        "calciteInputChange",
                        function () {
                            updateNewSlice();
                        }
                    );
                    newTiltInput.addEventListener("calciteInputChange", function () {
                        updateNewSlice();
                    });
                });
            });
        }
    };
});