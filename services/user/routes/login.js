const express = require('express');
// const debug = require('debug')('user:api');
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
        if (err){
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

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
