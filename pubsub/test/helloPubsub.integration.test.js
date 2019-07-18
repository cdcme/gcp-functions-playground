const assert = require('assert')
const tools = require('@google-cloud/nodejs-repo-tools')
const {Buffer} = require('safe-buffer')
const path = require('path')

const execPromise = require('child-process-promise').exec
const requestRetry = require('requestretry')

const BASE_URL = process.env.BASE_URL
const cwd = path.join(__dirname, '..')

const TOPIC = process.env.FUNCTIONS_TOPIC || 'pubsub_test_topic'
const MESSAGE = 'Hello, world!'

describe('helloPubsub', () => {
  beforeEach(tools.stubConsole)
  afterEach(tools.restoreConsole)

  it('publish fails without parameters', async () => {
    const response = await requestRetry({
      url: `${BASE_URL}/`,
      method: 'POST',
      body: {},
      retryDelay: 200,
      json: true,
    })

    assert.strictEqual(response.statusCode, 500)
    assert.strictEqual(
      response.body,
      'Missing parameter(s) include "topic" and "subscription" properties in your request.'
    )
  })

  it('publishes a message', async () => {
    const response = await requestRetry({
      url: `${BASE_URL}/`,
      method: 'POST',
      body: {
        topic: TOPIC,
        message: 'Pub/Sub from Cloud Functions',
      },
      retryDelay: 200,
      json: true,
    })

    assert.strictEqual(response.statusCode, 200)
    assert.strictEqual(response.body, 'Hello, World!')
  })

  it('prints out a message', () => {
    const jsonObject = JSON.stringify({data: MESSAGE})
    const jsonBuffer = Buffer.from(jsonObject).toString('base64')
    const pubsubMessage = {data: jsonBuffer, attributes: {}}

    require('..').subscribe(pubsubMessage)

    assert.strictEqual(console.log.callCount, 1)
    assert.deepStrictEqual(console.log.firstCall.args, [jsonObject])
  })
})