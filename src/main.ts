import * as core from '@actions/core'
import * as github from '@actions/github'
import * as QRCode from 'qrcode'

async function run(): Promise<void> {
  try {
    const content = core.getInput('content', {required: true})
    const result = await QRCode.toDataURL(content)
    const comment = core.getInput('comment', {required: true})
    const body = comment.replace('{qrcode}', `![QRCode]($result)`)

    console.log("result");
    console.log("result " + result);
    
    const token = core.getInput('repo-token', {required: true})
    const githubAPI = new github.GitHub(token)
    const {repo, issue} = github.context
    console.log("result " + result);

    await githubAPI.issues.createComment({
      owner: repo.owner,
      repo: repo.repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: issue.number,
      body
    })
    console.log("result " + result);
    process.env['tester'] = result;
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
