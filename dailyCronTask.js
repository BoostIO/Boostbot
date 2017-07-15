const IncomingWebhook = require('@slack/client').IncomingWebhook
const slackWebhook = require('./slackWebhook')
const GitHub = require('github-api')
const Repository = GitHub.Repository
const fs = require('fs')
require('dotenv').config()

const GitHubAccessToken = process.env.GITHUB_ACCESS_TOKEN
const url = process.env.SLACK_WEBHOOK_URL
const slack = new slackWebhook(url)

const organization = 'BoostIO'
const repository = 'Boostnote'
const gh = new GitHub({ token: GitHubAccessToken })
const repo = gh.getRepo(organization, repository)

const filename = 'star-count.txt'
const yesterday = fs.readFileSync(filename)

repo.getDetails().then(res => {
  const starCount = res.data.stargazers_count
  const difference = parseInt(starCount) - parseInt(yesterday)
  const message = `@here It's time to notice the star counts!\nTotal: ${starCount}\nToday: ${difference}`
  slack.sendMessage(message)
  fs.writeFile(filename, starCount)
})
