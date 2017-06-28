module.exports = function (sites, apiKey) {
    "use strict";

    const psi = require('psi'),
          fs = require('fs');

    sites.forEach(site => {
        var reportPath = '/home/pi/pagespeed/report/' + site.name + '/',
        reportFile = reportPath + new Date().toISOString().replace("T", " ").split(".")[0] + '.txt',
        logPath = '/home/pi/pagespeed/log/pageSpeed.log';

        var lastResult = () => {
        var files = fs.readdirSync(reportPath).sort(function(a, b) {
                return fs.statSync(reportPath + a).mtime.getTime() - fs.statSync(reportPath + b).mtime.getTime();
            }).slice(-1);

        if (!files[0]) return 0;

        var reportFile = reportPath + files[0];
        var lastFileContent = fs.readFileSync(reportFile, 'utf8');
        return JSON.parse(lastFileContent).ruleGroups.SPEED.score;
        };

        console.log('Checking ' + site.name);

        psi(site.url, { strategy: site.environment, key: apiKey }).then(data => {
            if (!fs.existsSync(reportPath)) fs.mkdirSync(reportPath);

        if (data.ruleGroups.SPEED.score > lastResult()) {
            var logMsg = '\n[' + new Date().toISOString().replace("T", " ").split(".")[0] + '] ' + site.name + ': Score has increased from ' + lastResult() + ' to ' + data.ruleGroups.SPEED.score + '.';
            fs.appendFileSync(logPath, logMsg);
        }
        else if (data.ruleGroups.SPEED.score < lastResult()) {
            var logMsg = '\n[' + new Date().toISOString().replace("T", " ").split(".")[0] + '] ' + site.name + ': Score has decreased from ' + lastResult() + ' to ' + data.ruleGroups.SPEED.score + '.';
            fs.appendFileSync(logPath, logMsg);
        }

        var fileContent = JSON.stringify(data);
            fs.writeFileSync(reportFile, fileContent);
        })
        .catch(err => {
            console.log(err);
        });
    });
};
