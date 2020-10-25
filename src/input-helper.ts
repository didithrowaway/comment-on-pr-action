import * as core from '@actions/core'

export interface InputSettings {
  prId: number
  commentPrefix: string
  message: string
  token: string
  user: string
  repo: string
}

export function getInputs(): InputSettings {
  const result = {} as InputSettings
  const id = core.getInput('pr-id')

  result.prId = parseInt(id)
  result.commentPrefix = core.getInput('comment-prefix')
  result.token = core.getInput('token')
  result.message = core.getInput('message')
  result.user = core.getInput('user')
  result.repo = core.getInput('repo')

  if (isNaN(result.prId)) {
    throw new Error('pr-id is not a number')
  }

  return result
}
