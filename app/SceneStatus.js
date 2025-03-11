//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {
        initialize: function (view) {
            //【场景状态监测】创建必备变量
            const events = [
                "pointer-enter",
                "pointer-leave",
                "pointer-move",
                "pointer-down",
                "pointer-up",
                "immediate-click",
                "click",
                "immediate-double-click",
                "double-click",
                "mouse-wheel",
                "drag",
                "hold",
                "key-down",
                "key-up",
                "focus",
                "blur",
                "resize"
            ];
            const properties = [
                "focused",
                "interacting",
                "updating",
                "resolution",
                "scale",
                "zoom",
                "stationary",
                "camera.position.z",
                "camera.tilt",
                "camera.heading"
            ];
            return [events, properties]
        },
        //【场景状态监测】从定义的数组动态创建事件和属性表
        createTables: function (events, properties) {
            const eventsTable = document.getElementById("events");
            let content = eventsTable.innerHTML;
            for (let i = 0; i < events.length; i++) {
                content += '<div class="event" id="' + events[i] + '">' + events[i];
                content += "</div>";
            }
            eventsTable.innerHTML = content;
            const propertiesTable = document.getElementById("properties");
            content = propertiesTable.innerHTML;
            for (let i = 0; i < properties.length; i++) {
                content +=
                    '<div class="property" id="' +
                    properties[i] +
                    '">' +
                    properties[i] +
                    " = </div>";
            }
            propertiesTable.innerHTML = content;
        },
        //【场景状态监测】设置事件监听状态
        setupEventListener: function (view, name) {
            const eventRow = document.getElementById(name);
            view.on(name, (value) => {
                eventRow.className = "event active";
                if (eventRow.highlightTimeout) {
                    clearTimeout(eventRow.highlightTimeout);
                }
                eventRow.highlightTimeout = setTimeout(() => {
                    // after a timeout of one second disable the highlight
                    eventRow.className = "event inactive";
                }, 1000);
            });
        },
        //【场景状态监测】设置属性监听状态
        setupPropertiesListener: function (view, name) {
            const propertiesRow = document.getElementById(name);
            view.watch(name, (value) => {
                propertiesRow.className = "property active";
                propertiesRow.innerHTML = propertiesRow.innerHTML.substring(
                    0,
                    propertiesRow.innerHTML.indexOf(" = ")
                );
                // set the text to the received value
                const formattedValue =
                    typeof value === "number" ? value.toFixed(4) : value;
                propertiesRow.innerHTML += " = " + formattedValue.toString();
                if (propertiesRow.highlightTimeout) {
                    clearTimeout(propertiesRow.highlightTimeout);
                }
                propertiesRow.highlightTimeout = setTimeout(() => {
                    // after a timeout of one second disable the highlight
                    propertiesRow.className = "property inactive";
                }, 1000);
            });
        },
        //启动
        start: function (view) {
            const panel1 = new Expand({
                view: view,
                content: document.getElementById("panel1"),
                expandIconClass: "esri-icon-dashboard",
                iconNumber: 1,
                expandTooltip: "场景状态监测"
            });
            view.ui.add(panel1, "top-left");
        }
    }
}
);
