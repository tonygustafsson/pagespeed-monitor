"use strict";

const psi = require('psi'),
      fs = require('fs');

const checkSites = [
    {
        'name': 'StarRepublic.com Desktop',
        'url': 'http://www.starrepublic.com',
        'environment': 'desktop'
    },
    {
	'name': 'StarRepublic.com Mobile',
    	'url': 'http://www.starrepublic.com',
	'environment': 'mobile'
    },
    {
        'name': 'Gulled Desktop',
        'url': 'http://www.gulled.se',
        'environment': 'desktop'
    },
    {
        'name': 'Gulled Mobile',
        'url': 'http://www.gulled.se',
        'environment': 'mobile'
    },
    {
	'name': 'Kicks SE Desktop',
	'url': 'https://www.kicks.se',
	'environment': 'desktop'
    },
    {
	'name': 'Kicks SE Mobile',
	'url': 'https://m.kicks.se',
	'environment': 'mobile'
    },
    {
	'name': 'Kicks NO Desktop',
	'url': 'https://www.kicks.no',
	'environment': 'desktop'
    },
    {
	'name': 'Kicks NO Mobile',
	'url': 'https://m.kicks.no',
	'environment': 'mobile'
    },
    {
	'name': 'Kicks FI Desktop',
	'url': 'http://www.kicks.fi',
	'environment': 'desktop'
    },
    {
	'name': 'Scorett Desktop',
	'url': 'http://www.scorett.se',
	'environment': 'desktop'
    },
    {
	'name': 'Scorett Mobile',
	'url': 'http://m.scorett.se',
	'environment': 'mobile'
    },
    {
	'name': 'Sandryds Desktop',
	'url': 'http://www.sandryds.com',
	'environment': 'desktop'
    },
    {
	'name': 'Sandryds Mobile',
	'url': 'http://www.sandryds.com',
	'environment': 'mobile'
    },
    {
	'name': 'Dawadack Desktop',
	'url': 'http://www.dawadack.se',
	'environment': 'desktop'
    },
    {
	'name': 'Skanetrafiken Desktop',
	'url': 'https://www.skanetrafiken.se',
	'environment': 'desktop'
    },
    {
	'name': 'Skanetrafiken Mobile',
	'url': 'https://www.skanetrafiken.se',
	'environment': 'mobile'
    },
    {
	'name': 'Margarethas Desktop',
	'url': 'https://www.margaretha.se',
	'environment': 'desktop'
    },
    {
	'name': 'Margarethas Mobile',
	'url': 'https://www.margaretha.se',
	'environment': 'mobile'
    },
    {
	'name': 'Kappahl Desktop',
	'url': 'https://www.kappahl.com',
	'environment': 'desktop'
    },
    {
	'name': 'Kappahl Mobile',
	'url': 'https://www.kappahl.com',
	'environment': 'mobile'
    }
];

checkSites.forEach(site => {
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

    psi(site.url, { strategy: site.environment }).then(data => {
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

