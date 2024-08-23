const express = require('express');
// const debug = require('debug')('order:api');
const { Kafka } = require('kafkajs');
const { Pool } = require('pg');
const kafkaConfig = require('../helpers/kafka');

const router = express.Router();
console.log(process.env.DATABASE_URL);
let _pool;

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

const kafka = new Kafka({ brokers: kafkaConfig.borkers, clientId: 'order-service' });
const producer = kafka.producer();

router.get('/', async (req, res) => {
  const pool = await getPGPool();
  const { rows } = await pool.query('SELECT * FROM orders');
  res.send(rows);
});

router.post('/', async (req, res) => {
  const order = req.body;
  // const { rows } = await pool.query(
  //   'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
  //   [...order],
  // );
  await producer.send({
    topic: kafkaConfig.orderCreatedTopic,
    messages: [{ value: JSON.stringify(order) }],
  });
  res.status(201).send('Order received');
});

module.exports = router;
