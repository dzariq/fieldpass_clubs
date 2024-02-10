// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

// Define the topic name
const topicName = 'new-club';

app.use(express.json());

app.post('/', (req, res) => {
  publishMessage();

  res.status(200).send(`OK`);
  return;
});

// Publish a message to the topic
async function publishMessage() {
   // Message to publish
   const data = JSON.stringify({ message: 'Hello from CLUB MICROSERVICE!' });

   try {
     // Get the Pub/Sub topic
     const topic = pubsub.topic(topicName);
 
     // Publish the message to the topic
     await topic.publish(Buffer.from(data));
 
     res.status(200).send('Message published to Pub/Sub topic.');
   } catch (error) {
     console.error('Error publishing message:', error);
     res.status(500).send('Error publishing message to Pub/Sub topic.');
   }
}



module.exports = app;
