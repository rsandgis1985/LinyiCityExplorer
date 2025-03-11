//搜索器
define([
    "esri/widgets/Expand"
], function (Expand) {

    return {
        initialize: function (view) {
            view.when(() => {
                const performanceInfoExpand = new Expand({
                    view: view,
                    content: document.getElementById("performanceInfo"),
                    expandIconClass: "esri-icon-dashboard",
                    iconNumber: 2,
                    expandTooltip: "性能监测"
                });
                view.ui.add(performanceInfoExpand, "top-left");
                updatePerformanceInfo();
            });
            function updatePerformanceInfo() {
                const performanceInfo = view.performanceInfo;
                updateMemoryTitle(
                    performanceInfo.usedMemory,
                    performanceInfo.totalMemory,
                    performanceInfo.quality
                );
                updateTables(performanceInfo);
                setTimeout(updatePerformanceInfo, 6000);
            };
            function updateMemoryTitle(used, total, quality) {
                const title = document.getElementById("title");
                title.innerHTML = `Memory: ${getMB(used)}MB/${getMB(
                    total
                )}MB  -  Quality: ${Math.round(100 * quality)} %`;
            };
            function updateTables(stats) {
                const tableMemoryContainer = document.getElementById("memory");
                const tableCountContainer = document.getElementById("count");
                tableMemoryContainer.innerHTML = `<tr>
                  <th>Resource</th>
                  <th>Memory(MB)</th>
                </tr>`;
                for (layerInfo of stats.layerPerformanceInfos) {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${layerInfo.layer.title
                        }</td><td class="center">${getMB(layerInfo.memory)}</td>`;
                    tableMemoryContainer.appendChild(row);
                }

                tableCountContainer.innerHTML = `<tr>
                  <th>Layer - Features</th>
                  <th>Displayed / Max<br>(count)</th>
                  <th>Total<br>(count)</th>
                </tr>`;

                for (layerInfo of stats.layerPerformanceInfos) {
                    if (layerInfo.maximumNumberOfFeatures) {
                        const row = document.createElement("tr");
                        row.innerHTML = `<td>${layerInfo.layer.title}`;
                        row.innerHTML += `<td class="center">${layerInfo.displayedNumberOfFeatures
                            ? layerInfo.displayedNumberOfFeatures
                            : "-"
                            } / ${layerInfo.maximumNumberOfFeatures
                                ? layerInfo.maximumNumberOfFeatures
                                : "-"
                            }</td>`;
                        row.innerHTML += `<td class="center">${layerInfo.totalNumberOfFeatures
                            ? layerInfo.totalNumberOfFeatures
                            : "-"
                            }</td>`;
                        tableCountContainer.appendChild(row);
                    }
                }
            };

            function getMB(bytes) {
                const kilobyte = 1024;
                const megabyte = kilobyte * 1024;
                return Math.round(bytes / megabyte);
            }
        }

    }
}
);
