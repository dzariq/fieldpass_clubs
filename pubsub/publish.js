const fs = require('fs');
const keyFilePath = JSON.parse(fs.readFileSync('./fieldpass.privatekey.json'));
const topicName = 'projects/chatbot-401803/topics/new-club';
const { PubSub } = require('@google-cloud/pubsub');

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

  module.exports = publishMessage;