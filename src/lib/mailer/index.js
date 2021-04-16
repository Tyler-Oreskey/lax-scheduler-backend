const AWS = require('aws-sdk');
const {
  aws: { keys, region, email },
} = require('../../config');

AWS.config.update({ ...keys, region });

// Create email params for SES.
class Params {
  constructor(toAddresses, body, subject) {
    this.Destination = {
      ToAddresses: toAddresses, // can also be an array
    };
    this.Message = {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    };
    this.Source = email.from;
  }
}

// Send email with generated params.
class SendMail {
  constructor() {
    this.params = null;
    this.ses = new AWS.SES({ apiVersion: 'latest' });
  }
  async sendMail(toAddresses, body, subject) {
    if (!body || !subject) {
      return null;
    }

    if (Array.isArray(toAddresses)) {
      if (toAddresses.length === 0) {
        return null;
      }
    } else if (typeof toAddresses === 'string') {
      toAddresses = [toAddresses];
    } else {
      return null;
    }

    this.params = new Params(toAddresses, body, subject);
    await this.ses.sendEmail({ ...this.params }).promise();
  }
}
module.exports = SendMail;
