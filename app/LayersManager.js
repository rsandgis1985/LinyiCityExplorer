//搜索器
define([
    "esri/layers/SceneLayer",
    "esri/layers/BuildingSceneLayer",
    "esri/layers/IntegratedMeshLayer",
    "esri/layers/PointCloudLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/VoxelLayer",
    "esri/layers/voxel/VoxelVariableStyle",
    "esri/layers/ElevationLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/LayerList",
    "esri/layers/GroupLayer",
    "esri/widgets/Slider",
    "esri/widgets/Expand"
], function (
    SceneLayer,
    BuildingSceneLayer,
    IntegratedMeshLayer,
    PointCloudLayer,
    FeatureLayer,
    VoxelLayer,
    VoxelVariableStyle,
    ElevationLayer,
    GraphicsLayer,
    LayerList,
    GroupLayer,
    Slider,
    Expand
) {

    return {

        initialize: function (view) {
            //创建建筑物图层并添加至地图对象中
            const Building3DLayer = new SceneLayer({
                portalItem: {
                    //id: "e4d6756de6444079b2c8e38fa8214d91"
                    id: "1f29ad684b344299869ae7f77e88af69"
                },
                title: "【多面体】城区",
                popupEnabled: true
            });
            //创建地层图层并添加至地图对象中
            const stratumLayer = new SceneLayer({
                portalItem: {
                    //id: "a62010be13d547199ef69ab1be8d6411"
                    id: "dca642e6701e443b84797d86d476e664"
                },
                title: "【地层】城区西北",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            //创建地层图层并添加至地图对象中
            const stratumLayer2 = new SceneLayer({
                portalItem: {
                    //id: "27e4e428e2f240deaa2361d1c405e7c5"
                    id: "f7916f7cbb524db68db3d79eff488c5f"
                },
                title: "【地层】城区",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            //创建地层图层并添加至地图对象中
            const stratumLayer3 = new SceneLayer({
                portalItem: {
                    //id: "27e4e428e2f240deaa2361d1c405e7c5"
                    id: "24d0a36c01e746e08394638a15f9ea62"
                },
                title: "【地层】中联水泥",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            //创建地层图层并添加至地图对象中
            const stratumLayer4 = new SceneLayer({
                portalItem: {
                    //id: "27e4e428e2f240deaa2361d1c405e7c5"
                    id: "1cff5acc224344b195165d93a8e71afa"
                },
                title: "【地层】地质体",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            //创建BIM单体建筑物图层并添加至地图对象中
            const buildingSYHYM5Layer = new BuildingSceneLayer({
                portalItem: {
                    //id: "a761d82467074b4181d630788ae91662"
                    id: "970e4e6b169c472c9ab4eaaebca07271"
                },
                title: "【BIM】水韵华苑M5",
                visible: false,
            });
            //创建BIM单体建筑物图层并添加至地图对象中
            const buildingSYHYG4Layer = new BuildingSceneLayer({
                portalItem: {
                    //id: "090c00d449d04295b173c67a226cf4ca"
                    id: "c7b109f6409c423cb435163ce0cc46b6"
                },
                title: "【BIM】水韵华苑G4",
                visible: false,
            });
            //创建BIM单体建筑物图层并添加至地图对象中
            const buildingSYHYW1Layer = new BuildingSceneLayer({
                portalItem: {
                    //id: "769bf1c39fc449fd868bb7238614c9a5"
                    id: "643ff2b506244135a2976f3a29d56a0a"
                },
                title: "【BIM】水韵华苑G4",
                visible: false,
            });
            //创建临沂大学倾斜摄影测量图层并添加至地图对象中
            const LYUTiltLayer = new IntegratedMeshLayer({
                portalItem: {
                    //id: "045ee247740b42ee835a28cd70fece71"
                    id: "51e077a02efb435d8b81cb2930024e14"
                },
                title: "【倾斜摄影】临大",
                listMode: "show",
                visible: false,
                copyright: "临沂大学资源环境学院",
                popupEnabled: true
            });
            //创建临沂大学倾斜摄影测量图层并添加至地图对象中
            const ZLSNMeshLayer = new IntegratedMeshLayer({
                portalItem: {
                    //id: "045ee247740b42ee835a28cd70fece71"
                    id: "3fc90fc1867b4ecc990d0ab66fcd7d83"
                },
                title: "【倾斜摄影】中联",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            //创建临沂大学倾斜摄影测量图层并添加至地图对象中
            const LinyiSouthTiltLayer = new PointCloudLayer({
                portalItem: {
                    //id: "98203ee892974d44920ebaca1803be0f"
                    id: "54379d4184c942288382c4f104c00ea0"
                },
                title: "【点云】临沂南部",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            // 定义高程
            const currentElevationInfo = {
                mode: "on-the-ground",
                offset: 0,
                unit: "meters"
            };
            Building3DLayer.elevationInfo = currentElevationInfo;
            // 定义高程
            const currentElevationInfo2 = {
                mode: "relative-to-ground",//on-the-ground,relative-to-ground, absolute-height, relative-to-scene
                offset: 0,
                unit: "meters"
            };
            buildingSYHYM5Layer.elevationInfo = currentElevationInfo2;
            buildingSYHYG4Layer.elevationInfo = currentElevationInfo2;
            buildingSYHYW1Layer.elevationInfo = currentElevationInfo2;
            // 定义高程2
            const stratumElevationInfo = {
                mode: "absolute-height",
                offset: 0,
                unit: "meters"
            };
            stratumLayer.elevationInfo = stratumElevationInfo;
            stratumLayer3.elevationInfo = stratumElevationInfo;
            stratumLayer4.elevationInfo = stratumElevationInfo;
            //创建钻孔图层
            const DrillPointsLayer = new FeatureLayer({
                portalItem: {
                    //id: "0bcaaa0a30024c369b72f9273c510535"
                    id: "362cc2facd1944249d91c2b910ffee67"
                },
                title: "【钻孔】临沂西北",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            DrillPointsLayer.elevationInfo = stratumElevationInfo;
            //创建地层图层
            const LYUSWStratumLayer = new SceneLayer({
                portalItem: {
                    //id: "7d2b4bc5633044668576f0f8a29bcdfb"
                    id: "b9213a62c3d84c6697dbc21875e041e2"
                },
                title: "【地层】临沂西北",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            LYUSWStratumLayer.elevationInfo = stratumElevationInfo;
            //创建面片图层
            const LYUSWMianpianLayer = new SceneLayer({
                portalItem: {
                    //id: "b8276bd477fc46c49eba7fdb3ef4369b"
                    id: "7cb89b93eff74c6da60cdb5f40211fde"
                },
                title: "【面片】临沂西北",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            LYUSWMianpianLayer.elevationInfo = stratumElevationInfo;
            //创建面片图层
            const LYUSWXiangjiaomianLayer = new SceneLayer({
                portalItem: {
                    //id: "4f5099855d824d738cf61a394597b989"
                    id: "b28b2c197e374e3aa3499fd8b218aba3"
                },
                title: "【相交面】临沂西北",
                listMode: "show",
                visible: false,
                popupEnabled: true
            });
            LYUSWXiangjiaomianLayer.elevationInfo = stratumElevationInfo;
            //创建要素图层
            const EditTreeFeatureLayer = new FeatureLayer({
                portalItem: {
                    //id: "c00871f9d87b482ebc5d3971c9166c63"
                    id: "96b62e5d252e41538cca78fe27f47767"
                },
                title: "树木",
                listMode: "show",
                visible: false,
                elevationInfo: {
                    mode: "relative-to-ground"
                },
                popupEnabled: false
            });
            const EditRoadFeatureLayer = new FeatureLayer({
                portalItem: {
                    //id: "e3eb967bc5ad41fc9a24492db95a740d"
                    id: "b59a17960f6c42369a62faf151ca65b3"
                },
                title: "道路",
                listMode: "show",
                visible: false,
                elevationInfo: {
                    mode: "relative-to-ground"
                },
                popupEnabled: false
            });
            const EditWaterFeatureLayer = new FeatureLayer({
                portalItem: {
                    //id: "a1bed990dd7141bbb2835efd4938c04a"
                    id: "612a90744e1749c58402c31e2e606d34"
                },
                title: "水体",
                listMode: "show",
                visible: false,
                elevationInfo: {
                    mode: "on-the-ground"
                },
                //渲染水体表面
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "polygon-3d",
                        symbolLayers: [
                            {
                                type: "water",
                                waveDirection: 260,
                                color: "#25427c",
                                waveStrength: "moderate",
                                waterbodySize: "medium"
                            }
                        ]
                    }
                },
                popupEnabled: false
            });
            //【创建元素图层】
            const graphicsLayer = new GraphicsLayer({
                elevationInfo: { mode: "absolute-height" },
                title: "【绘图】可编辑"
            });
            const vxlLayer = new VoxelLayer({
                portalItem: {
                    id: "c29ea8c98e6044249a09cf6c7059a317"
                },
                title: "【体素】临沂城南",
                elevationInfo: {
                    mode: "relative-to-ground",
                    offset: 0
                },
                popupEnabled: true,
                visible: false
            });
            const localElevationLayer = new ElevationLayer({
                portalItem: {
                    //id: "4f5099855d824d738cf61a394597b989"
                    id: "75d599431bd846319729502fc2735dd0"
                },
                title: "本地高程",
                visible: true
            });
            // Create GroupLayer with the two MapImageLayers created above
            // as children layers.

            const BIMGroupLayer = new GroupLayer({
                title: "BIM建筑物",
                visible: false,
                visibilityMode: "independent",
                layers: [buildingSYHYM5Layer, buildingSYHYG4Layer, buildingSYHYW1Layer],
                opacity: 1
            });
            const stratumGroupLayer = new GroupLayer({
                title: "地层",
                visible: false,
                visibilityMode: "exclusive",
                layers: [stratumLayer, stratumLayer2, stratumLayer3, stratumLayer4, vxlLayer],
                opacity: 1
            });
            const editorGroupLayer = new GroupLayer({
                title: "可编辑要素",
                visible: false,
                visibilityMode: "inherited",
                layers: [EditTreeFeatureLayer, EditRoadFeatureLayer, EditWaterFeatureLayer,],
                opacity: 1
            });
            const GEGroupLayer = new GroupLayer({
                title: "地质工程",
                visible: false,
                visibilityMode: "inherited",
                layers: [DrillPointsLayer, LYUSWStratumLayer, LYUSWMianpianLayer, LYUSWXiangjiaomianLayer],
                opacity: 1
            });
            layerStack = [
                graphicsLayer,
                GEGroupLayer,
                stratumGroupLayer,
                BIMGroupLayer,
                editorGroupLayer,
                LinyiSouthTiltLayer,
                LYUTiltLayer,
                ZLSNMeshLayer,
                Building3DLayer,
            ];
            for (let i = 0; i < layerStack.length; i++) {
                //console.log(layerStack[i].type);
                view.map.add(layerStack[i]);
            };

            // Creates actions in the LayerList.
            function defineActions(event) {
                // The event object contains an item property.
                // is is a ListItem referencing the associated layer
                // and other properties. You can control the visibility of the
                // item, its title, and actions using this object.

                const item = event.item;

                if (!(item.title == "BIM建筑物" || item.title == "地层" || item.title == "可编辑要素" || item.title == "地质工程")) {
                    // An array of objects defining actions to place in the LayerList.
                    // By making this array two-dimensional, you can separate similar
                    // actions into separate groups with a breaking line.

                    item.actionsSections = [
                        [
                            {
                                title: "Go to full extent",
                                className: "esri-icon-zoom-out-fixed",
                                id: "full-extent"
                            },
                            {
                                title: "Layer information",
                                className: "esri-icon-description",
                                id: "information"
                            }
                        ]
                    ];
                }
            };
            view.when(() => {
                // Create the LayerList widget with the associated actions
                // and add it to the top-right corner of the view.

                const layerList = new LayerList({
                    view: view,
                    listItemCreatedFunction: defineActions
                });

                const LLExpand = new Expand({
                    view: view,
                    content: layerList,
                    expandTooltip: "图层"
                });
                view.ui.add(LLExpand, "top-left");

                // Event listener that fires each time an action is triggered

                layerList.on("trigger-action", (event) => {
                    // The layer visible in the view at the time of the trigger.
                    //const visibleLayer = USALayer.visible ? USALayer : censusLayer;

                    // Capture the action id.
                    const id = event.action.id;
                    const currentLayer = event.item.layer;
                    if (id == "full-extent") {
                        // if the full-extent action is triggered then navigate
                        // to the full extent of the visible layer
                        view.goTo(currentLayer.fullExtent).catch((error) => {
                            if (error.name != "AbortError") {
                                console.error(error);
                            }
                        });
                    } else if (id === "information") {
                        // if the information action is triggered, then
                        // open the item details page of the service layer
                        window.open(currentLayer.url);
                    };
                });

                const groundConfigExpand = new Expand({
                    view: view,
                    content: document.getElementById("groundConfigDiv"),
                    expandIconClass: "esri-icon-settings",
                    iconNumber: 1,
                    expandTooltip: "地面高程控制"
                });
                view.ui.add(groundConfigExpand, "bottom-right");
            });
            // Get reference to div elements
            const checkboxId2 = document.getElementById("checkboxId2");
            const checkboxId3 = document.getElementById("checkboxId3");
            let globalElevation = null;

            checkboxId2.onchange = () => {
                view.map.ground.layers.forEach((layer)=>{
                    if(layer.id=='worldElevation'){
                        globalElevation= layer;
                    }
                });//得到全球高程的id号
                if (checkboxId2.checked == false) {
                    view.map.ground.layers.remove(globalElevation);
                    //view.map.ground.layers.removeAll();
                } else {
                    //view.map.ground = "world-elevation";
                    view.map.ground.layers.add(globalElevation);
                    //view.map.ground.layers.remove(elevation);
                }

            };
            checkboxId3.onchange = () => {
                if (checkboxId3.checked == true) {
                    //view.map.ground.layers.removeAll();
                    view.map.ground.layers.add(localElevationLayer);
                } else {
                    //view.map.ground = "world-elevation";
                    view.map.ground.layers.remove(localElevationLayer);
                }

            };
            return [
                vxlLayer,
                Building3DLayer,
                stratumLayer,
                stratumLayer2,
                stratumLayer3,
                buildingSYHYM5Layer,
                buildingSYHYG4Layer,
                buildingSYHYW1Layer,
                LYUTiltLayer,
                ZLSNMeshLayer,
                LinyiSouthTiltLayer,
                DrillPointsLayer,
                LYUSWStratumLayer,
                LYUSWMianpianLayer,
                LYUSWXiangjiaomianLayer,
                EditTreeFeatureLayer,
                EditRoadFeatureLayer,
                EditWaterFeatureLayer,
                graphicsLayer
            ]
        }
    };
});
