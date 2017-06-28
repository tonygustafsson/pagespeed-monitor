(function(global) {

    var container = document.getElementById("reports"),
        header = document.getElementById("header"),
        offlineWarning = document.getElementById("offlineWarning"),
        getPageSpeedCheckTimer = null;

    function getReports() {
        var request = new XMLHttpRequest();
        request.open('GET', '/get-reports', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var reports = JSON.parse(this.response);

                console.log(reports);
                container.innerHTML = "";

                for (var i = 0; i < reports.length; i++) {
                    var report = reports[i],
                        newElement = document.createElement('div');

                    if (report.pagespeed.ruleGroups.SPEED.score >= 80) {
                        newElement.className = "report-item report-item-score-ok";
                    }
                    else if (report.pagespeed.ruleGroups.SPEED.score >= 60) {
                        newElement.className = "report-item report-item-score-warning";
                    }
                    else {
                        newElement.className = "report-item report-item-score-bad";
                    }

                    var html = "";
                    html += "<div class='score'>" + report.pagespeed.ruleGroups.SPEED.score + "</div>";
                    html += "<h1>" + report.name + "</h1>";

                    html += "<p class='url'>" + report.pagespeed.id + "</p>";

                    if (typeof report.pagespeed.ruleGroups.USABILITY !== "undefined") {
                        html += "<p>Usability score: " + report.pagespeed.ruleGroups.USABILITY.score + "</p>";
                    }

                    html += "<p class='extra-info'>CSS: " + report.pagespeed.pageStats.numberCssResources + " files (" + Math.floor(report.pagespeed.pageStats.cssResponseBytes / 1024) + " kB)<br>";
                    html += "JS: " + report.pagespeed.pageStats.numberJsResources + " files (" + Math.floor(report.pagespeed.pageStats.javascriptResponseBytes / 1024) + " kB)<br>";
                    html += "IMG: " + Math.floor(report.pagespeed.pageStats.imageResponseBytes / 1024) + " kB<br>";
                    html += "Resources: " + report.pagespeed.pageStats.numberResources + "</p>";

                    newElement.innerHTML = html;
                    container.appendChild(newElement);
                }
            }
            else {
                // We reached our target server, but it returned an error
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };

        request.send();

        getPageSpeedCheckTimer = setTimeout(getReports, 60000);
    }

    function toggleFullscreen(elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
          !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    function loadLogPage() {
        var request = new XMLHttpRequest();
            request.open('GET', '/get-log', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                container.innerHTML = "";
                clearTimeout(getPageSpeedCheckTimer);

                var logs = JSON.parse(this.response);

                for (var i = 0; i < logs.length; i++) {
                    var log = logs[i],
                        paragraph = document.createElement('p');

                    if (log === "") continue;

                    if (log.indexOf('has decreased') !== -1) {
                        paragraph.className = "log-item decreased";
                    }
                    else if (log.indexOf('has increased') !== -1) {
                        paragraph.className = "log-item increased";
                    }

                    paragraph.textContent = log;
                    container.appendChild(paragraph);
                }
            }
            else {
                // We reached our target server, but it returned an error
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };

        request.send();
    }

    document.getElementById('pagespeed-link').addEventListener('click', getReports);

    document.getElementById('fullscreen-link').addEventListener('click', function () {
        toggleFullscreen(document.body);
    });

    document.getElementById('log-link').addEventListener('click', function (e) {
        e.preventDefault();

        loadLogPage();
    });

    window.addEventListener('online', function (e) {
        offlineWarning.className = "offline-warning";
    }, false);

    window.addEventListener('offline', function (e) {
        offlineWarning.className = "offline-warning offline";
    }, false);

    getReports();

})(window);

