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
    const url = 'https://hooks.slack.com/services/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?authtoken=xoxb-459079151415-459237191175-RiYCxKYkMniFzhR9g4goBxE0'
    const webhook = new IncomingWebhook(url);

    webhook.send(`${query.firstName} ${query.lastName} took dayoff at ${query.from}`, function(err, res) {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('Message sent: ', res);
      }
    });

    return res.status(HttpStatus.OK).send(query);
  }
}
