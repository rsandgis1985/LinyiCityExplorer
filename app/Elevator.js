//搜索器
define([
    "esri/widgets/ElevationProfile",
    "esri/widgets/Expand"
], function (ElevationProfile, Expand) {

    return {

        initialize: function (view) {
            // create the elevation profile widget
            const elevationProfile = new ElevationProfile({
                view: view,
                // configure widget with desired profile lines
                profiles: [
                    {
                        type: "ground" // first profile line samples the ground elevation
                    },
                    {
                        type: "view" // second profile samples the view and shows building profiles
                    }
                ],
                // hide the select button
                // this button can be displayed when there are polylines in the
                // scene to select and display the elevation profile for
                visibleElements: {
                    selectButton: false
                }
            });
            const epExpand = new Expand({
                view: view,
                content: elevationProfile,
                expandTooltip: "高程剖面"
            });
            // Add the widget to the top-right corner of the view
            view.ui.add(epExpand, "top-right");
        }
    };
});
