const express = require('express');
// const debug = require('debug')('payment:api');
const { Kafka } = require('kafkajs');
const { Pool } = require('pg');

const router = express.Router();
console.log(process.env.DATABASE_URL);
let _pool;
let _inited_ = false;

async function getPGPool() {
  if (_pool) {
    return _pool;
  }
  _pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // TODO: Handle error
  try {
    await new Promise((resolve, reject) => {
      _pool.connect((err, client, done) => {
        if (err) {
          reject(err);
          throw err;
        }
        client.query('SELECT NOW()', (err, res) => {
          done(); // release the client back to the pool
          if (err) {
            console.log(err.stack);
            reject(err);
          } else {
            console.log(res.rows[0]);
            resolve(true);
          }
        });
      });
    });
  } catch (err) {
    throw err;
  }

  return _pool;
}

function init() {
  if(_inited_) return
  const kafka = new Kafka({ brokers: ['kafka:9092'] });
  const consumer = kafka.consumer({ groupId: 'payment-group' });
  consumer.connect();
  consumer.subscribe({ topic: 'order-created', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Processing payment for order:', message.value.toString());
      // Payment processing logic
    },
  });
}

module.exports = {init};
