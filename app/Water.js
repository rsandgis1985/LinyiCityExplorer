//搜索器
define([
    "esri/widgets/Slider",
    "esri/widgets/Expand"
], function (Slider,Expand) {

    return {

        initialize: function (view, EditWaterFeatureLayer) {
            //【水体表面】
            const waterExpand = new Expand({
                view: view,
                content: document.getElementById("menu2"),
                expandIconClass: "esri-icon-applications",
                expandTooltip: "水体表面"
            });
            view.ui.add(waterExpand, "top-right");
            const slider = new Slider({
                container: "waveSlider",
                min: 0,
                max: 360,
                visibleElements: {
                    labels: true
                },
                precision: 0,
                values: [260]
            });

            slider.on("thumb-drag", (event) => {
                const value = parseInt(event.value);
                const renderer = EditWaterFeatureLayer.renderer.clone();
                renderer.symbol.symbolLayers.getItemAt(0).waveDirection = value;
                EditWaterFeatureLayer.renderer = renderer;
            });

            const waveStrengthRadio =
                document.getElementsByName("waveStrengthRadio");

            for (let i = 0; i < waveStrengthRadio.length; i++) {
                const element = waveStrengthRadio[i];
                element.addEventListener("change", (event) => {
                    const renderer = EditWaterFeatureLayer.renderer.clone();
                    renderer.symbol.symbolLayers.getItemAt(0).waveStrength =
                        event.target.value;
                    EditWaterFeatureLayer.renderer = renderer;
                });
            }

            function setWaterColor(color) {
                const renderer = EditWaterFeatureLayer.renderer.clone();
                renderer.symbol.symbolLayers.getItemAt(0).color = color;
                EditWaterFeatureLayer.renderer = renderer;
            }

            document.getElementById("navy").addEventListener("click", () => {
                setWaterColor("#25427c");
            });
            document.getElementById("green").addEventListener("click", () => {
                setWaterColor("#039962");
            });
            document.getElementById("turqoise").addEventListener("click", () => {
                setWaterColor("#a2f9f5");
            });

            document
                .getElementById("reflection")
                .addEventListener("click", (event) => {
                    view.environment.lighting.waterReflectionEnabled =
                        event.target.checked;
                });
        }
    };
});
