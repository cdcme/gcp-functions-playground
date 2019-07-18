'use strict'

const {PubSub} = require('@google-cloud/pubsub')
const pubsub = new PubSub()
const {Buffer} = require('safe-buffer')

/**
 * Publishes a message to a Cloud Pub/Sub Topic.
 *
 * @example
 * gcloud functions call publish --data '{"topic":"[YOUR_TOPIC_NAME]","message":"Hello, world!"}'
 *
 *   - Replace `[YOUR_TOPIC_NAME]` with your Cloud Pub/Sub topic name.
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {string} req.body.topic Topic name on which to publish.
 * @param {string} req.body.message Message to publish.
 * @param {object} res Cloud Function response context.
 */
exports.publish = async (req, res) => {
  console.log(`TOPIC: ${req.body.topic}`)
  console.log(`MESSAGE: ${req.body.message}`)

  if (!req.body.topic || !req.body.message) {
    res
      .status(500)
      .send(
        'Missing parameter(s) include "topic" and "subscription" properties in your request.'
      )
    return
  }

  console.log(`Publishing message to topic ${req.body.topic}`)

  // References an existing topic
  const topic = pubsub.topic(req.body.topic)

  const messageObject = {
    data: {
      message: req.body.message,
    },
  }
  const messageBuffer = Buffer.from(JSON.stringify(messageObject), 'utf8')

  // Publishes a message
  try {
    await topic.publish(messageBuffer)
    res.status(200).send('Hello, World!')
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
    return Promise.reject(err)
  }
}

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {object} pubsubMessage The Cloud Pub/Sub Message object.
 * @param {string} pubsubMessage.data The "data" property of the Cloud Pub/Sub Message.
 */
exports.subscribe = pubsubMessage => {
  // Print out the data from Pub/Sub, to prove that it worked
  console.log(Buffer.from(pubsubMessage.data, 'base64').toString())
}
