const GitHub = require('github-api')
const Repository = GitHub.Repository

class PRWebhook {
  constructor(organization, repository, number, accessToken) {
    const gh = new GitHub({ token: accessToken })
    this.repo = gh.getRepo(organization, repository)
    this.iss = gh.getIssues(organization, repository)
    this.number = number
  }

  warnByFile (file, comment) {
    this.repo.listPullRequestFiles(this.number).then((prs) => {
      if (prs.data.some((pr) => { return pr.filename.includes(file) })) {
        this.iss.createIssueComment(this.number, comment)
      }
    })
  }

  labelOnMerged (label) {
    this.iss.addLabel(this.number, label)
  }
}

module.exports = PRWebhook
