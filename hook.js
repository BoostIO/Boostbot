const http = require('http')
const createHandler = require('github-webhook-handler')
const GitHub = require('github-api')
const PRWebhook = require('./PRWebhook')

const port = process.env.port || 80
const secret = process.env.WEBHOOK_secret
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
  if (event.payload.action !== 'opened') return
  const webhook = new PRWebhook(organizationName, repositoryName, GitHubAccessToken)
  const comment = 'Be sure to change `browser/main/Detail/SnippetNoteDetail.js`.'
  webhook.warn(event.payload.number, comment)
})
