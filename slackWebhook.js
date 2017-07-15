const IncomingWebhook = require('@slack/client').IncomingWebhook

class slackWebhook {
  constructor (webhook_url) {
    this.webhook = new IncomingWebhook(webhook_url)
  }
  sendMessage (message) {
    this.webhook.send(message, (err, header, statusCode, body) => {
      if (err) {
        console.log('Error:', err)
      } else {
        console.log('Received', statusCode, 'from Slack')
      }
    })
  }
}

module.exports = slackWebhook
