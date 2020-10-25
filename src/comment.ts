import {InputSettings} from './input-helper'
import * as github from '@actions/github'
import {OctokitResponse, IssuesCreateCommentResponseData} from '@octokit/types'
import * as core from '@actions/core'

export async function postComment(input: InputSettings): Promise<string> {
  return new Promise<string>(async resolve => {
    const octokit = github.getOctokit(input.token)
    const messageBody = '${input.commentPrefix}\n${input.message}'

    const response: OctokitResponse<IssuesCreateCommentResponseData> = await octokit.issues.createComment(
      {
        owner: input.user,
        repo: input.repo,
        issue_number: input.prId,
        body: JSON.stringify(messageBody)
      }
    )

    if (isSuccessful(response.status)) {
      resolve(response.data.url)
    } else {
      core.error('Posting comment resulted in status code: ${response.status}')
      resolve('')
    }
  })
}

function isSuccessful(status: number): boolean {
  return status >= 200 && status <= 300
}
