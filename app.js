// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();
const { PubSub } = require('@google-cloud/pubsub');

// Create a new Pub/Sub client
const pubsub = new PubSub({
  projectId: 'chatbot-401803',
});

// Define the topic name
const topicName = 'new-club';

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());
// [END run_pubsub_server_setup]
// [END cloudrun_pubsub_server_setup]

// [START cloudrun_pubsub_handler]
// [START run_pubsub_handler]
app.post('/', (req, res) => {
  // Call the publishMessage function to publish the message
  publishMessage();

  res.status(200).send(`OK`);
  return;
});

// Publish a message to the topic
async function publishMessage() {
  const data = JSON.stringify({ message: 'Hello from CLUBS!' });

  try {
    // Get the topic object
    const topic = pubsub.topic(topicName);

    // Publish the message
    const messageId = await topic.publish(Buffer.from(data));

    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

// [END run_pubsub_handler]
// [END cloudrun_pubsub_handler]

module.exports = app;
