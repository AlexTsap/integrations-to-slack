// tslint:disable
import { Get, Controller, Req, Res, Query, HttpStatus } from '@nestjs/common';
import { IncomingWebhook } from '@slack/client';
import { slackUrl } from '../slack-url';

@Controller()
export class AppController {
    @Get('/slack-integrations')
    async root(
        @Req() req,
        @Res() res,
        @Query() query
    ): Promise<any> {

        this.checkLeaveType(query);

        return res.status(HttpStatus.OK).send(query);
    }

    checkLeaveType(query) {
        switch (query.type) {
            case 'Day Off':
                this.buildDayOffMessage(query);
                break;
            case 'Remote work':
                this.buildRemoteWorkMessage(query);
                break;
            case 'Sick Leave':
                this.buildSickLeaveMessage(query);
                break;
            case 'Vacation':
                this.buildVacationMessage(query);
                break;
        }
    }

    buildDayOffMessage(query) {
        const webhook = new IncomingWebhook(slackUrl);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `;
        }

        let dayOffMsg = `${query.firstName} ${query.lastName} took dayoff at ${query.from}. ${reasonMsg}`;

        if (query.from && query.to && (query.from !== query.to)) {
            dayOffMsg = `${query.firstName} ${query.lastName} took dayoffs from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(dayOffMsg, function (err, res) {

            if (err) {
                console.error('Error sending day off message:', err);
            } else {
                console.log('Dayoff message  sent: ', res);
            }
        });
    }

    buildSickLeaveMessage(query) {
        const webhook = new IncomingWebhook(slackUrl);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `;
        }

        let sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leave at ${query.from}. ${reasonMsg}`;

        if (query.from && query.to && (query.from !== query.to)) {
            sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leaves from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(sickLeaveMsg, function (err, res) {

            if (err) {
                console.error('Error sending sick leave message:', err);
            } else {
                console.log('Sick leave message  sent: ', res);
            }
        });
    }

    buildRemoteWorkMessage(query) {
        const webhook = new IncomingWebhook(slackUrl);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `;
        }

        let remoteWorkMsg = `${query.firstName} ${query.lastName} works remotely at ${query.from}. ${reasonMsg}`;

        if (query.from && query.to && (query.from !== query.to)) {
            remoteWorkMsg = `${query.firstName} ${query.lastName} works remotely from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(remoteWorkMsg, function (err, res) {
            if (err) {
                console.error('Error sending remote message:', err);
            } else {
                console.log('Remote message  sent: ', res);
            }
        });
    }

    buildVacationMessage(query) {
        const webhook = new IncomingWebhook(slackUrl);
        let vacationMsg = `${query.firstName} ${query.lastName} took vacation day at ${query.from}.`;

        if (query.from && query.to && (query.from !== query.to)) {
            vacationMsg = `${query.firstName} ${query.lastName} took vacation from ${query.from} to ${query.to}.`;
        }

        webhook.send(vacationMsg, function (err, res) {
            if (err) {
                console.error('Error sending vacation message:', err);
            } else {
                console.log('Vacation message sent: ', res);
            }
        });
    }

}
