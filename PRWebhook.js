const GitHub = require('github-api')
const Repository = GitHub.Repository

class PRWebhook {
  constructor(organization, repository, accessToken) {
    const gh = new GitHub({ token: accessToken })
    this.repo = gh.getRepo(organization, repository)
    this.iss = gh.getIssues(organization, repository)
  }

  warnForFiles (number, comment) {
    this.repo.listPullRequestFiles(number).then((prs) => {
      if (prs.data.some((pr) => { return pr.filename === 'browser/main/Detail/MarkdownNoteDetail.js' })) {
        this.iss.createIssueComment(number, comment)
      }
    })
  }

  labelOnMerged (number, label) {
    this.iss.addLabel(number, label)
  }
}

module.exports = PRWebhook
