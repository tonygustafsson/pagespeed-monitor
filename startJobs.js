"use strict";

// Google PageSpeed API Key
const apiKey = 'YOUR-API-KEY';

const sites = [
    {
        'name': 'Google.com Desktop',
        'url': 'http://www.google.com',
        'environment': 'desktop'
    },
    {
	    'name': 'Google.com  Mobile',
    	    'url': 'http://www.google.com',
	    'environment': 'mobile'
    }
];

const checkPageSpeed = require('./checkPagespeed.js');
checkPageSpeed(sites, apiKey);
