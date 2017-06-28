"use strict";

const express = require('express'),
	  app = express(),
	  fs = require('fs');

app.get('/', function (req, res) {
	res.sendFile('/home/pi/pagespeed/server/shell.html');
});

app.get('/assets/style.css', function (req, res) {
	res.sendFile('/home/pi/pagespeed/server/assets/style.css');
});

app.get('/assets/main.js', function (req, res) {
	res.sendFile('/home/pi/pagespeed/server/assets/main.js');
});

app.get('/get-reports', function (req, res) {
	var reportsPath = '/home/pi/pagespeed/report',
        reports = [],
	    folders = fs.readdirSync('/home/pi/pagespeed/report');

	folders.forEach(folder => {
		let directoryPath = reportsPath + '/' + folder + '/',
			files = fs.readdirSync(directoryPath).sort(function(a, b) {
        		return fs.statSync(directoryPath + a).mtime.getTime() - fs.statSync(directoryPath + b).mtime.getTime();
        	}).slice(-1);

		var reportFile = directoryPath + files[0];

		var report = {
			'name': folder,
			'pagespeed': JSON.parse(fs.readFileSync(reportFile, 'utf8'))
		};

		reports.push(report);
	});

	res.send(JSON.stringify(reports));
});

app.get('/get-log', function (req, res) {
	var file = '/home/pi/pagespeed/log/pageSpeed.log',
		content = fs.readFileSync(file, 'utf8'),
		rows = content.split('\n'),
		logs = [];

	rows.forEach(row => {
		logs.push(row);
	});

	res.send(JSON.stringify(logs));
});

app.listen(3001, function () {
	console.log('Starting web server');
});
