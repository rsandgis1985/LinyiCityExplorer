//搜索器
define([
    "esri/widgets/Editor",
    "esri/widgets/Expand"
], function (Editor, Expand) {

    return {

        initialize: function (view) {
            //【创建三维编辑器】
            const editor = new Editor({
                view: view
            });
            const editExpand = new Expand({
                view: view,
                content: editor,
                expandIconClass: "esri-icon-edit",
                expandTooltip: "编辑器"
            });
            view.ui.add(editExpand, "bottom-left");
        }
    };
});
