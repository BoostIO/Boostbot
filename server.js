const http = require('http')
const createHandler = require('github-webhook-handler')
const GitHub = require('github-api')
const PRWebhook = require('./PRWebhook')

const port = process.env.PORT || 80
const secret = process.env.WEBHOOK_SECRET
const organizationName = 'BoostIO'
const repositoryName = 'Boostnote'
const GitHubAccessToken = process.env.GITHUB_ACCESS_TOKEN

const handler = createHandler({
  path: '/',
  secret: secret
})

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(port)

handler.on('error', (err) => {
  console.error('Error:', err)
})

handler.on('pull_request', (event) => {
  const webhook = new PRWebhook(organizationName, repositoryName, GitHubAccessToken)
  if (event.payload.action === 'opened') {
    const comment = 'Be sure to change `browser/main/Detail/SnippetNoteDetail.js`.'
    webhook.warnForFiles(event.payload.number, comment)
  } else if (event.payload.action === 'closed' && event.payload.pull_request.merged) {
    const labels = ['Next Release']
    webhook.labelOnMerged(event.payload.number, labels)
  }
})
