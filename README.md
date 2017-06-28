# PageSpeed Monitor
Using NodeJS for checking sites score with Google PageSpeed API. And a express server with a GUI to show these results.

## Setup NodeJS
`sudo npm install nodejs npm`

## Setup repository
`git clone https://github.com/tonygustafsson/pagespeed-monitor.git`

## Setup script
`mkdir log report`

## Setup nodejs packages
`npm install ~/pagespeed/`

## Setup cron job
`crontab -e`

Add the following to run the script at 6:00 and 12:00
`0 6,12 * * * /usrbin/node /home/pi/pagespeed/startJobs.js

Add the following to start expess server at boot
`@reboot /usr/bin/node /home/pi/pagespeed/server/server.js`

## Directories
* /log: Everytime a website changes is score since last time, it is logged here
* /report: All reports from all PageSpeed checks is stored here. Latest file is used for comparison
* /server: Contans the express web server

