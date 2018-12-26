// tslint:disable
import { Get, Controller, Req, Res, Query, HttpStatus } from '@nestjs/common';
import { IncomingWebhook } from '@slack/client';

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
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `
        }

        let dayOffMsg = `${query.firstName} ${query.lastName} took dayoff at ${query.from}. ${reasonMsg}`;

        if (query.from && query.to && (query.from !== query.to)) {
            console.log('day off from to')
            dayOffMsg = `${query.firstName} ${query.lastName} took dayoffs from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(dayOffMsg, function (err, res) {

            if (err) {
                console.log('Error sending day off message:', err);
            } else {
                console.log('Dayoff message  sent: ', res);
            }
        });
    }

    buildSickLeaveMessage(query) {
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `
        }

        let sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leave at ${query.from}. ${reasonMsg}`;

        console.log('reasonMsg', reasonMsg)


        if (query.from && query.to && (query.from !== query.to)) {
            console.log('sick from to')
            sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leaves from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        console.log('sickLeaveMsg', sickLeaveMsg)


        webhook.send(sickLeaveMsg, function (err, res) {

            if (err) {
                console.log('Error sending sick leave message:', err);
            } else {
                console.log('Sick leave message  sent: ', res);
            }
        });
    }

    buildRemoteWorkMessage(query) {
        console.log('IM IN REMOTE WORK FUNC')
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
        let reasonMsg = '';

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `
        }

        let remoteWorkMsg = `${query.firstName} ${query.lastName} works remotely at ${query.from}. ${reasonMsg}`;


        if (query.from && query.to && (query.from !== query.to)) {
            console.log('remote from to')
            remoteWorkMsg = `${query.firstName} ${query.lastName} works remotely from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(remoteWorkMsg, function (err, res) {
            if (err) {
                console.log('Error sending remote message:', err);
            } else {
                console.log('Remote message  sent: ', res);
            }
        });
    }

    buildVacationMessage(query) {
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
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
