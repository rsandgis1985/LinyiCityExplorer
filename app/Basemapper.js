//搜索器
define([
    "esri/Basemap",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand"
], function (Basemap, BasemapGallery, Expand) {

    return {

        initialize: function (view) {
            let nothingBasemap = new Basemap({
                portalItem: {
                  id: "5787647b251b466e86d87ab302a96137" // Mid-Century Map
                }
               });
            //【添加底图】创建底图对象
            const basemapGallery = new BasemapGallery({
                view: view,
                // autocasts to LocalBasemapsSource
                source: [
                    Basemap.fromId("satellite"),
                    Basemap.fromId("hybrid"),
                    Basemap.fromId("oceans"),
                    Basemap.fromId("osm"),
                    Basemap.fromId("terrain"),
                    Basemap.fromId("dark-gray-vector"),
                    Basemap.fromId("gray-vector"),
                    Basemap.fromId("streets-vector"),
                    Basemap.fromId("streets-night-vector"),
                    Basemap.fromId("streets-navigation-vector"),
                    Basemap.fromId("topo-vector"),
                    Basemap.fromId("streets-relief-vector"),
                    nothingBasemap
                ]
            });
            const bgExpand = new Expand({
                view: view,
                content: basemapGallery,
                expandTooltip: "底图"
            });
            view.ui.add(bgExpand, "top-left");
        }
    };
});
