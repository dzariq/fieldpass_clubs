<?php

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

// RabbitMQ connection parameters
$host = 'b-3689f904-84c1-4b17-af1c-5a88ca79dac2.mq.us-east-1.amazonaws.com';
$port = 5671;
$username = 'fieldpass';
$password = '#1Sampai9123456';
$vhost = '/';
$exchange = 'fieldpass_clubs';
$queue = 'new-club';

// Create a connection to RabbitMQ
$connection = new AMQPStreamConnection($host, $port, $username, $password, $vhost);

// Create a channel
$channel = $connection->channel();

// Declare the exchange and queue
$channel->exchange_declare($exchange, 'direct', false, true, false);
$channel->queue_declare($queue, false, true, false, false);
$channel->queue_bind($queue, $exchange);

// Message to publish
$messageBody = 'Hello from PHP!';

// Create a new AMQPMessage with the message body
$message = new AMQPMessage($messageBody);

// Publish the message to the exchange
$channel->basic_publish($message, $exchange);

echo "Message published successfully.\n";

// Close the channel and connection
$channel->close();
$connection->close();
