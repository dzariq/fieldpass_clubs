// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();
const { PubSub } = require('@google-cloud/pubsub');
const { GoogleAuth } = require('google-auth-library');

const topicName = 'projects/chatbot-401803/topics/new-club';
const keyFilePath = path.join(__dirname, 'fieldpass.privatekey.json');


app.use(express.json());
app.post('/', (req, res) => {
  publishMessage();

  res.status(200).send(`OK`);
  return;
});

async function publishMessage() {
  const data = JSON.stringify({ message: 'Hello from CLUBS!' });

  try {
    const client = await authenticateWithServiceAccount();

    const pubsub = new PubSub({
      projectId: 'chatbot-401803',
    });

    const topic = pubsub.topic(topicName);
    const messageId = await topic.publish(Buffer.from(data));

    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}

async function authenticateWithServiceAccount() {
  const auth = new GoogleAuth({
      keyFilename: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  const client = await auth.getClient();
  return client;
}

// [END run_pubsub_handler]
// [END cloudrun_pubsub_handler]

module.exports = app;
