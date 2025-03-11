//构建主程序
define([
  "esri/core/Accessor",
  "esri/views/SceneView",
  "esri/WebScene",
  "esri/Camera",
  "esri/config",
  "app/Basemapper",
  "app/LayersManager",
  "app/Legender",
  "app/BuildingsExplorer",
  "app/SceneStatus",
  "app/Slicer",
  "app/TableController",
  "app/FeatureEditor",
  "app/Environment",
  "app/Water",
  "app/Elevator",
  "app/Texturer",
  "app/Edger",
  "app/Measurer",
  "app/Shadower",
  "app/Models3D",
  "app/Sketcher",
  "app/Performancer",
  "app/Searcher",
  "app/Tracker",
  "app/DiscreteVoxeler",
  "app/SlicesVoxeler",
  "app/ModeController"
], function (
  Accessor,
  SceneView,
  WebScene,
  Camera,
  esriConfig,
  Basemapper,
  LayersManager,
  Legender,
  BuildingsExplorer,
  SceneStatus,
  Slicer,
  TableController,
  FeatureEditor,
  Environment,
  Water,
  Elevator,
  Texturer,
  Edger,
  Measurer,
  Shadower,
  Models3D,
  Sketcher,
  Performancer,
  Searcher,
  Tracker,
  DiscreteVoxeler,
  SlicesVoxeler,
  ModeController
) {
  const Collection = Accessor.createSubclass({
    init: function (containers) {
      //设定空间数据门户
      //esriConfig.portalUrl = "https://lyupc.org.cn/arcgis";
      esriConfig.portalUrl = "https://gis.sddkqy.cn/portal";
      initialWebSceneParams = {
        basemap: "dark-gray-vector",
        ground: "world-elevation"
        //viewingMode: "global"//"global"|"local"
      };
      initialSceneViewParams = {
        map: null,
        container: containers.view,
        viewingMode: "local",
        camera: {
          position: [118.32, 35.08, 30110],
          tilt: 0,
          heading: 0
        },
        viewingMode: "local",//"global"|"local"
        qualityProfile: "high",
        highlightOptions: {
          haloOpacity: 0
        },
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          }
        }
      };
      //设置摄像机
      const cam = new Camera({
        position: [118.27, 35.01, -452.28],
        heading: 3.08, // facing due south
        tilt: 89.42      // bird's eye view
      });
      var beginTime = 0;//执行onbeforeunload的开始时间
      var differTime = 0;//时间差
      window.onunload = function () {
        differTime = new Date().getTime() - beginTime;
        if (differTime <= 5) {
          console.log("浏览器关闭")
        } else {
          console.log("浏览器刷新")
        }
      }
      window.onbeforeunload = function () {
        beginTime = new Date().getTime();
        //console.log("浏览器刷新");
        if (window.localStorage) {
          if (window.localStorage.getItem("count")) {
            //拿出key对应的value， 因为存储进去的是字符串。
            var c = parseInt(window.localStorage.getItem("count"));
            // 设置key，value加1
            window.localStorage.setItem("count", c + 1);
            console.log(parseInt(window.localStorage.getItem("count")));
          }
        }
      };
      //页面加载时仅执行window.onload
      window.onload = function () {
        {
          if (window.name == "") {
            window.name = "0";
            //清空记录
            if (window.localStorage) {
              if (window.localStorage.getItem("count") != null) {
                window.localStorage.removeItem('count');
                window.localStorage.setItem("count", 0);
              } else {
                window.localStorage.setItem("count", 0);
              }
            }
          }
          else {
            window.name = eval(window.name) + 1;
            //alert("已经刷新" + window.name + '次');
          }
        }
      }
      const switchButton = document.getElementById("switch-btn");
      // switch the view between 局部 and 全局 each time the button is clicked
      switchButton.addEventListener("click", () => {
        location.reload();
      });
      if (window.name != "") {
        var num = localStorage.getItem('count');
        //alert(abc);
        if ((num % 2) === 0) {//判定条件余数为0时为偶数
          //alert(num + '是' + '偶数')
          initialSceneViewParams.viewingMode = "local";
          switchButton.value = "局部";
        } else {
          //alert(num + '是' + '奇数')
          initialSceneViewParams.viewingMode = "global";
          switchButton.value = "全局";
        };
      }

      //创建场景对象
      const LinyiScene = new WebScene(initialWebSceneParams);
      //创建视图
      const view = new SceneView(initialSceneViewParams);
      view.map = LinyiScene;
      //view.viewingMode="local";

      //添加图层
      var layerStack = LayersManager.initialize(view);

      const vxlLayer = layerStack[0];
      const Building3DLayer = layerStack[1];
      const stratumLayer = layerStack[2];
      const stratumLayer2 = layerStack[3];
      const stratumLayer3 = layerStack[4];
      const buildingSYHYM5Layer = layerStack[5];
      const buildingSYHYG4Layer = layerStack[6];
      const buildingSYHYW1Layer = layerStack[7];
      const LYUTiltLayer = layerStack[8];
      const ZLSNMeshLayer = layerStack[9];
      const LinyiSouthTiltLayer = layerStack[10];
      const DrillPointsLayer = layerStack[11];
      const LYUSWStratumLayer = layerStack[12];
      const LYUSWMianpianLayer = layerStack[13];
      const LYUSWXiangjiaomianLayer = layerStack[14];
      const EditTreeFeatureLayer = layerStack[15];
      const EditRoadFeatureLayer = layerStack[16];
      const EditWaterFeatureLayer = layerStack[17];
      const graphicsLayer = layerStack[18];

      //LayersManager.LayersMng(view);
      Basemapper.initialize(view);
      Legender.initialize(view);
      //【事件监听】
      [events, properties] = SceneStatus.initialize();
      SceneStatus.createTables(events, properties);
      for (let i = 0; i < events.length; i++) {
        SceneStatus.setupEventListener(view, events[i]);
      };
      for (let i = 0; i < properties.length; i++) {
        SceneStatus.setupPropertiesListener(view, properties[i]);
      };
      SceneStatus.start(view);
      //【性能监测】
      Performancer.initialize(view);
      BuildingsExplorer.initialize(view, buildingSYHYM5Layer, buildingSYHYG4Layer, buildingSYHYW1Layer);
      Searcher.initialize(view);
      //【要素编辑器】
      FeatureEditor.initialize(view);
      //【高程剖面】
      Elevator.initialize(view);
      //【纹理控制】
      Texturer.initialize(view);
      Texturer.start(Building3DLayer);
      //【边缘控制】
      Edger.initialize(view, Building3DLayer);
      //Building3DLayer.renderer = renderer;
      //Edger.start(Building3DLayer, solidEdges, sketchEdges);
      //Building3DLayer.elevationInfo.mode = "on-the-ground";
      //【测量】
      Measurer.initialize(view);
      Measurer.start(view);
      //【阴影分析】
      Shadower.initialize(view);
      //【3D模型】
      Models3D.initialize(view, graphicsLayer);
      //【草图编辑】
      Sketcher.initialize(view, graphicsLayer);
      Sketcher.start(view);
      //【部分控件】
      Environment.initialize(view);
      //【环境仿真】
      Water.initialize(view, EditWaterFeatureLayer);
      //【模式控制】
      ModeController.initialize(view);
      //【地层剖面】
      const excludedLayers = [];
      const sliceButton = document.getElementById("slice");
      const resetPlaneBtn = document.getElementById("resetPlaneBtn");
      const clearPlaneBtn = document.getElementById("clearPlaneBtn");
      const sliceOptions = document.getElementById("sliceOptions");
      let sliceWidget = null;
      let doorsLayer = null;
      let sliceTiltEnabled = true;
      [sliceWidget, sliceTiltEnabled] = Slicer.setSliceWidget(view, excludedLayers, sliceTiltEnabled, clearPlaneBtn);
      Slicer.setupPropertiesListener(sliceWidget, sliceTiltEnabled, resetPlaneBtn, clearPlaneBtn);
      Slicer.start(view, LinyiScene, sliceWidget, sliceTiltEnabled, cam);
      //【表格控件】
      const appContainer = document.getElementById("appContainer");
      const tableContainer = document.getElementById("tableContainer");
      const tableDiv = document.getElementById("tableDiv");
      featureTable = TableController.initialize(view, DrillPointsLayer, appContainer, tableContainer, tableDiv);
      // Get reference to div elements
      const checkboxEle = document.getElementById("checkboxId");
      const labelText = document.getElementById("labelText");
      // Listen for when toggle is changed, call toggleFeatureTable function
      checkboxEle.onchange = () => {
        TableController.toggleFeatureTable(checkboxEle, appContainer, tableContainer);
      };
      //【跟踪】
      Tracker.initialize(view);
      //【体素离散化】
      DiscreteVoxeler.initialize(view);
      //【体素连续化】
      SlicesVoxeler.initialize(view);
    }
  });
  return Collection;
});
