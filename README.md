
## Description
App for Slack integration with Zoho People API. Sends info about dayoffs, remote work, vacations, sickleaves to the Slack rooms.

## Pre-setup
You have to setup url to Slack room in *slack-url.ts*, in format like this: 
```code
slackUrl = 'https://hooks.slack.com/services/YYYYYYYY/XXXXXXX/ZZZZZZZZZ?authtoken=slack-auth-token'
``` 

Also, **deploy.sh** and **Dockerfile** has to be created

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```