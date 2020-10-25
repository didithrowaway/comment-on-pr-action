import {InputSettings} from './input-helper'
import * as github from '@actions/github'
import {OctokitResponse, IssuesCreateCommentResponseData} from '@octokit/types'

export async function postComment(input: InputSettings): Promise<string> {
  return new Promise<string>(async resolve => {
    const octokit = github.getOctokit(input.token)
    const messageBody = '${input.commentPrefix}\n${input.message}'

    try {
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
      }
    } catch (e) {
      throw new TypeError(e.message)
    }
  })
}

function isSuccessful(status: number): boolean {
  return status >= 200 && status <= 300
}
