import * as core from '@actions/core'
import {getInputs} from './input-helper'
import {postComment} from './comment'

async function run(): Promise<void> {
  try {
    const input = getInputs()
    const url = await postComment(input)

    core.info(`Posted comment ${url} on pull request ${input.prId}`)
    core.setOutput('url', url)
  } catch (error) {
    core.error(`Failed: ${error}`)
    core.setFailed(error)
  }
}

run()
