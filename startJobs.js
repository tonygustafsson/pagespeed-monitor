"use strict";

// Google PageSpeed API Key
const apiKey = 'AIzaSyDH2oRZs7F5GtVoovCK2KOdeLpU5xhh_-A';

const sites = [
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
    },
    {
        'name': 'Grolls Desktop',
        'url': 'http://www.grolls.com',
        'environment': 'desktop'
    },
    {
        'name': 'Brandpartner Desktop',
        'url': 'http://carlsberg.brandstore.net',
        'environment': 'desktop'
    },
    {
        'name': 'Privab Desktop',
        'url': 'http://www.privab.se',
        'environment': 'desktop'
    },
    {
        'name': 'Privab Mobile',
        'url': 'http://www.privab.se',
        'environment': 'mobile'
    }
];

const checkPageSpeed = require('./checkPagespeed.js');
checkPageSpeed(sites, apiKey);