const express = require('express');
// const debug = require('debug')('product:api');
const { Pool } = require('pg');

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

router.get('/', async (req, res) => {
  const pool = await getPGPool();
  const { rows } = await pool.query('SELECT * FROM products');
  res.send(rows);
});

router.post('/', async (req, res) => {
  const pool = await getPGPool();
  const { name, price } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price],
  );
  res.send(rows[0]);
});

module.exports = router;
