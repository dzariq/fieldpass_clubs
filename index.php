<?php

require 'vendor/autoload.php';

use Google\Cloud\PubSub\PubSubClient;

// Create a Pub/Sub client
$pubsub = new PubSubClient([
    'projectId' => 'chatbot-401803'
]);

// Get the topic name
$topicName = 'new-club';

// Get the topic
$topic = $pubsub->topic($topicName);

// Create a message to publish
$data = [
    'message' => 'Hello from Cloud Run!'
];

// Publish the message
$topic->publish([
    'data' => json_encode($data)
]);

echo "Event published successfully.\n";

