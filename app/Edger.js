//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {

        initialize: function (view,Layer) {
            const solidEdges = {
                type: "solid",
                color: [0, 0, 0, 0.6],
                size: 1
            };

            const sketchEdges = {
                type: "sketch",
                color: [0, 0, 0, 0.8],
                size: 1,
                extensionLength: 10
            };

            // Create the renderer and configure visual variables
            const renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "mesh-3d",
                    symbolLayers: [
                        {
                            type: "fill",
                            material: {
                                color: "#ffffff",
                                colorMixMode: "replace"
                            },
                            edges: solidEdges
                        }
                    ]
                },
                visualVariables: [
                    {
                        // specifies a visual variable of continuous color
                        type: "color",
                        // based on a field indicating the walking time to public transport
                        field: "walkTimeToStopsInService",
                        legendOptions: {
                            title: "Walking time to public transport"
                        },
                        // color ramp from white to blue
                        // based on the walking time to public transport.
                        // Buildings will be assigned a color proportional
                        // to the min and max colors specified below
                        stops: [
                            {
                                value: 1,
                                color: "#2887a1",
                                label: "less than 1 minute"
                            },
                            {
                                value: 15,
                                color: "#ffffff",
                                label: "more than 15 minutes"
                            }
                        ]
                    }
                ]
            };
            document
            .getElementById("controls")
            .addEventListener("click", (event) => {
                // the edges variable is null in case user selects "No edges"
                let edges = null;

                if (event.target.id === "sketchEdges") {
                    edges = sketchEdges;
                } else if (event.target.id === "solidEdges") {
                    edges = solidEdges;
                }

                if (event.target.checked) {
                    const renderer = Layer.renderer.clone();
                    renderer.symbol.symbolLayers.getItemAt(0).edges = edges;
                    Layer.renderer = renderer;
                }
            });
            const panel3 = new Expand({
                view: view,
                content: document.getElementById("panel3"),
                expandIconClass: "esri-icon-cursor-marquee",
                expandTooltip: "边缘切换"
            });
            view.ui.add(panel3, "top-right");
        }
    };
});
