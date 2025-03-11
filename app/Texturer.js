//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {

        initialize: function (view) {
            const panel2 = new Expand({
                view: view,
                content: document.getElementById("panel2"),
                expandIconClass: "esri-icon-media",
                expandTooltip: "纹理切换"
              });
              view.ui.add(panel2, "top-right");
        },
        getUniqueValueRenderer: function (color, colorMixMode) {
            return {
                type: "unique-value", // autocasts as new UniqueValueRenderer()
                field: "usage",
                symbol: {
                    type: "mesh-3d", // autocasts as new MeshSymbol3D()
                    symbolLayers: [
                        {
                            type: "fill", // autocasts as new FillSymbol3DLayer()
                            material: {
                                color: [230, 230, 230, 0.7],
                                // We are not interested in these buildings, but we keep them for context
                                // We want to remove the texture so we set the colorMixMode to replace
                                colorMixMode: "replace"
                            }
                        }
                    ]
                },
                uniqueValueInfos: [
                    {
                        value: "general or commercial",
                        label: "commercial buildings",
                        symbol: {
                            type: "mesh-3d", // autocasts as new MeshSymbol3D()
                            symbolLayers: [
                                {
                                    type: "fill", // autocasts as new FillSymbol3DLayer()
                                    material: {
                                        color: color,
                                        colorMixMode: colorMixMode
                                    }
                                }
                            ]
                        }
                    }
                ],
                legendOptions: {
                    title: "Usage"
                }
            };
        },
        // This function sets a new renderer on the layer depending on selected option
        setRenderer: function (type,Layer) {
            if (type === "original") {
                Layer.renderer = null;
            } else if (type === "select") {
                // In this case we want to keep the texture unmodified for the buildings we are interested in
                // color and colorMixMode should be set to null, otherwise they default to "white" and "multiply"
                Layer.renderer = this.getUniqueValueRenderer(null, null);
            } else if (type === "emphasize") {
                // We apply a color to make buildings stand out, but we also want to keep the texture, so we use tint
                Layer.renderer = this.getUniqueValueRenderer("#F5D5A9", "tint");
            } else {
                // Applying a white color with tint option will desaturate the texture
                // Use replace if the texture should be removed
                const colorMixMode = type === "desaturate" ? "tint" : "replace";

                // Create a SimpleRenderer and apply it to the layer
                const locationRenderer = {
                    type: "simple", // autocasts as new SimpleRenderer()
                    symbol: {
                        type: "mesh-3d", // autocasts as new MeshSymbol3D()
                        symbolLayers: [
                            {
                                type: "fill", // autocasts as new FillSymbol3DLayer()
                                material: {
                                    color: "white",
                                    colorMixMode: colorMixMode
                                }
                            }
                        ]
                    }
                };
                Layer.renderer = locationRenderer;
            }
        },
        start: function(Layer){
            document
            .getElementById("colorMixMode")
            .addEventListener("change", (event) => {
              this.setRenderer(event.target.id,Layer);
            });
        }
    };
});
