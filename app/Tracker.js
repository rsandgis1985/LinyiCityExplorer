//搜索器
define([
    "lib/2gis.github.io/mock-geolocation/dist/geolocate", // geolocation simulator (https://github.com/2gis/mock-geolocation)
    "esri/widgets/Track",
    "esri/widgets/Expand"
], function (geolocate, Track, Expand) {

    return {

        initialize: function (view) {
            var viewFiles = document.getElementById("viewFiles");
            var coords = null;
            var setIntervalId = null;
            var clearIntervalId = null;
            var currentCoordIndex = null;
            viewFiles.addEventListener("change", function () {
                if (setIntervalId != null) {
                    clearIntervalId = clearInterval(setIntervalId);
                }
                coords = viewFile(this.files[0]);
                // geolocation simulator
                [currentCoordIndex, setIntervalId] = stubGeolocation(coords);
            }, false);
            const track = new Track({
                view: view,
                goToLocationEnabled: false
            });
            const trackPanel = new Expand({
                view: view,
                content: document.getElementById("trackJsonDiv"),
                expandIconClass: "esri-icon-settings",
                iconNumber:2,
                expandTooltip: "设定轨迹"
            });
            view.ui.add(trackPanel, "bottom-right");
            view.ui.add(track, "bottom-right");

            var timeValueInputId = document.getElementById("timeValueInput")
            timeValueInputId.onchange = function () {
                if (setIntervalId != null) {
                    clearIntervalId = clearInterval(setIntervalId);
                    setIntervalId = setInterval(() => {
                        geolocate.change(coords[currentCoordIndex]);
                        currentCoordIndex = (currentCoordIndex + 1) % coords.length;
                    }, document.getElementById("timeValueInput").value);//5000
                    console.log("clearIntervalId:" + clearIntervalId);
                    console.log(timeValueInputId.value);
                }
            }

            view.when(() => {
                let prevLocation = view.center;
                track.on("track", () => {
                    const location = track.graphic.geometry;
                    view
                        .goTo(
                            {
                                target: location,
                                tilt: document.getElementById("tiltValueInput").value,//90,
                                scale: document.getElementById("scaleValueInput").value,//500,
                                heading: 360 - getHeading(location, prevLocation), // only applies to SceneView
                                rotation: 360 - getHeading(location, prevLocation) // only applies to MapView
                            }
                        )
                        .catch((error) => {
                            if (error.name != "AbortError") {
                                console.error(error);
                            }
                        });

                    prevLocation = location.clone();
                });
                //track.start();
            });

            function getHeading(point, oldPoint) {
                // get angle between two points
                const angleInDegrees =
                    (Math.atan2(point.y - oldPoint.y, point.x - oldPoint.x) * 180) /
                    Math.PI;

                // move heading north
                return -90 + angleInDegrees;
            };

            // geolocation simulator
            function stubGeolocation(coords) {
                // let coords = [
                //     {
                //         lat: 35.114219095000067,
                //         lng: 118.27152087500008,
                //         altitude: 0
                //     },
                //     {
                //         lng: 118.27600953400008,
                //         lat: 35.116131001000042,
                //         altitude: 58.286999999996624
                //     },
                //     {
                //         lng: 118.27644882900006,
                //         lat: 35.116885609000065,
                //         altitude: 58.87159999999858
                //     },
                //     {
                //         lat: 35.117898860000082,
                //         lng: 118.27798988300003,
                //         altitude: 69.056500000006054
                //     },
                //     {
                //         lng: 118.27848794400006,
                //         lat: 35.118989928000076,
                //         altitude: 10
                //     },
                //     {
                //         lng: 118.27649155500001,
                //         lat: 35.11988401800005,
                //         altitude: 58.354099999996834
                //     },
                //     {
                //         lng: 118.27620047000005,
                //         lat: 35.120792354000059,
                //         altitude: 58.00800000000163
                //     },
                //     {
                //         lng: 118.26930544900006,
                //         lat: 35.122170193000045,
                //         altitude: -0.00010000000474974513
                //     }
                // ];
                //console.log(typeof(d2));
                currentCoordIndex = 0;
                geolocate.use();
                var setIntervalId = setInterval(() => {
                    geolocate.change(coords[currentCoordIndex]);
                    currentCoordIndex = (currentCoordIndex + 1) % coords.length;
                }, document.getElementById("timeValueInput").value);//5000
                console.log(document.getElementById("timeValueInput").value);
                return [currentCoordIndex, setIntervalId]//返回正在执行的计时器
            };

            function viewFile(file) {
                var d2 = null;
                //var tmp ={lng:118.32,lat:35.08,altitude:30110};
                var paths = [];
                var reader = new FileReader();
                console.log(file.name);
                var reg = /(.json|.geojson)$/m;
                if (reg.test(file.name)) {
                    reader.readAsText(file, 'utf8')
                };
                reader.onload = function (evt) {
                    if (reg.test(file.name)) {
                        var textView = document.getElementById("textbox");
                        textView.innerHTML = evt.target.result;
                        d1 = JSON.parse(textView.innerHTML);
                        d2 = d1["features"][0]["geometry"]["paths"][0]
                        //console.log(d1["features"][0]["geometry"]["paths"][0].length);
                        for (var i = 0; i < d2.length; i++) {
                            //console.log(d2[i]);
                            // tmp.lng=d2[i][0];
                            // tmp.lat=d2[i][1];
                            // tmp.altitude=d2[i][2];
                            var tmp = { lng: d2[i][0], lat: d2[i][1], altitude: d2[i][2] }
                            paths.push(tmp);
                        }
                        console.log(paths);
                    }
                }
                return paths
            }
        }
    };
});