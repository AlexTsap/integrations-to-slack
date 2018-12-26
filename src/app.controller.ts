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
                this.buildDayOffMessage();
                break;
            case 'Remote Work':
                this.buildRemoteWorkMessage();
                break;
            case 'Sick Leave':
                this.buildSickLeaveMessage();
                break;
            case 'Vacation':
                this.buildVacationMessage();
                break;
        }

    }

    buildDayOffMessage() {
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
        let reasonMsg = '';
        let dayOffMsg = `${query.firstName} ${query.lastName} took dayoff at ${query.from}. ${reasonMsg}`;

        if (query.reason) {
             reasonMsg = ` Reason: ${query.reason} `
        }

        if (query.from && query.to) {
            dayOffMsg = `${query.firstName} ${query.lastName} took dayoffs from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(dayOffMsg, function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
    }

    buildSickLeaveMessage() {
        const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0';
        const webhook = new IncomingWebhook(url);
        let reasonMsg = '';
        let sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leave at ${query.from}. ${reasonMsg}`;

        if (query.reason) {
            reasonMsg = ` Reason: ${query.reason} `
        }

        if (query.from && query.to) {
            sickLeaveMsg = `${query.firstName} ${query.lastName} took sick leaves from ${query.from} to ${query.to}. ${reasonMsg}`;
        }

        webhook.send(sickLeaveMsg, function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
    }

    buildRemoteWorkMessage() {

    }

    buildVacationMessage() {

    }

}
