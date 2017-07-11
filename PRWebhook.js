const GitHub = require('github-api')
const Repository = GitHub.Repository

class PRWebhook {
  constructor(userName, repositoryName, accessToken) {
    const gh = new GitHub({ token: accessToken })
    this.__repo = gh.getRepo(userName, repositoryName)
    this.__iss = gh.getIssues(userName, repositoryName)
  }

  warnForFiles (number, comment) {
    this.__repo.listPullRequestFiles(number).then((prs) => {
      if (prs.data.some((pr) => { return pr.filename === 'browser/main/Detail/MarkdownNoteDetail.js' })) {
        this.__iss.createIssueComment(number, comment)
      }
    })
  }

  labelOnMerged (number, label) {
    this.__iss.addLabel(number, label)
  }
}

module.exports = PRWebhook
