//搜索器
define([
    "esri/widgets/Search",
    "esri/widgets/Expand"
], function (Search,Expand) {

    return {

        initialize: function (view) {
            //【创建地址搜索】
            const search = new Search({
                view: view
            });
            const searchExpand = new Expand({
                view: view,
                content: search,
                expandTooltip: "地址搜索"
            });
            view.ui.add(searchExpand, "bottom-right");
        }
    };
});
