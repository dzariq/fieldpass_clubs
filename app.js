// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START cloudrun_pubsub_server_setup]
// [START run_pubsub_server_setup]
const express = require('express');
const app = express();
const { PubSub } = require('@google-cloud/pubsub');

const topicName = 'projects/chatbot-401803/topics/new-club';
// const keyFilePath = path.join(__dirname, 'fieldpass.privatekey.json');
const fs = require('fs');

const keyFilePath = JSON.parse(fs.readFileSync('./fieldpass.privatekey.json'));
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (replace with your Firebase config)
const serviceAccount = require('./firebase.serviceaccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to validate Firebase JWT token
function validateFirebaseToken(req, res, next) {
  const idToken = req.headers.authorization.split(' ')[1]; // Extract JWT token from Authorization header
  console.log(idToken)

  admin.auth().verifyIdToken(idToken,true)
    .then(decodedToken => {
      // Token is valid, store user information in request object for further processing
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.error('Error validating Firebase JWT token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    });
}

app.use(express.json());

function validateCreateClub(req, res, next) {
  const { clubName } = req.body;

  if (!clubName ) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  next();
}

app.post('/club', [validateCreateClub,validateFirebaseToken], (req, res) => {
  const { clubName } = req.body;
  publishMessage();
  res.status(201).json({ message: 'Club created successfully' });
});

async function publishMessage() {
  const data = JSON.stringify({ message: 'Hello from CLUBS!' });

  try {
    const pubsub = new PubSub({
      projectId: 'chatbot-401803',
      credentials: {
        client_email: keyFilePath.client_email,
        private_key: keyFilePath.private_key,
      },
    });

    const topic = pubsub.topic(topicName);
    const messageId = await topic.publish(Buffer.from(data));

    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}


module.exports = app;
