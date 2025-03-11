//搜索器
define([
    "esri/widgets/DirectLineMeasurement3D",
    "esri/widgets/AreaMeasurement3D",
    "esri/core/promiseUtils",
    "esri/widgets/Expand"
], function (DirectLineMeasurement3D, AreaMeasurement3D, promiseUtils, Expand) {
    let activeWidget = null;
    return {
        initialize: function (view) {
            const topbar = new Expand({
                view: view,
                content: document.getElementById("topbar"),
                expandIconClass: "esri-icon-measure",
                expandTooltip: "测量"
            });
            view.ui.add(topbar, "top-right");
        },
        setActiveWidget: function (view, type) {
            switch (type) {
                case "distance":
                    activeWidget = new DirectLineMeasurement3D({
                        view: view
                    });

                    // skip the initial 'new measurement' button
                    activeWidget.viewModel.start().catch((error) => {
                        if (promiseUtils.isAbortError(error)) {
                            return; // don't display abort errors
                        }
                        throw error; // throw other errors since they are of interest
                    });

                    view.ui.add(activeWidget, "top-right");
                    this.setActiveButton(view, document.getElementById("distanceButton"));
                    break;
                case "area":
                    activeWidget = new AreaMeasurement3D({
                        view: view
                    });

                    // skip the initial 'new measurement' button
                    activeWidget.viewModel.start().catch((error) => {
                        if (promiseUtils.isAbortError(error)) {
                            return; // don't display abort errors
                        }
                        throw error; // throw other errors since they are of interest
                    });

                    view.ui.add(activeWidget, "top-right");
                    this.setActiveButton(view, document.getElementById("areaButton"));
                    break;
                case null:
                    if (activeWidget) {
                        view.ui.remove(activeWidget);
                        activeWidget.destroy();
                        activeWidget = null;
                    }
                    break;
            }
        },
        setActiveButton: function (view, selectedButton) {
            // focus the view to activate keyboard shortcuts for sketching
            view.focus();
            const elements = document.getElementsByClassName("active");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
            if (selectedButton) {
                selectedButton.classList.add("active");
            }
        },
        start: function (view) {
            document
                .getElementById("distanceButton")
                .addEventListener("click", (event) => {
                    this.setActiveWidget(view, null);
                    if (!event.target.classList.contains("active")) {
                        this.setActiveWidget(view, "distance");
                    } else {
                        this.setActiveButton(view, null);
                    }
                });
            document
                .getElementById("areaButton")
                .addEventListener("click", (event) => {
                    this.setActiveWidget(view, null);
                    if (!event.target.classList.contains("active")) {
                        this.setActiveWidget(view, "area");
                    } else {
                        this.setActiveButton(view, null);
                    }
                });
        }

    };
});
