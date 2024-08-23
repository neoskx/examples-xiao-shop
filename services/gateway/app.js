const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  '/v1/api/login',
  createProxyMiddleware({
    // logger: console,
    target: process.env.USER_SERVICE || 'http://localhost:3040/v1/api/login',
    changeOrigin: true,
  }),
);

app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
});

app.use(
  '/v1/api/orders',
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE || 'http://localhost:3010/v1/api/orders',
    changeOrigin: true,
  }),
);

app.use(
  '/v1/api/payments',
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE || 'http://localhost:3020/v1/api/payments',
    changeOrigin: true,
  }),
);

app.use(
  '/v1/api/products',
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE || 'http://localhost:3030/v1/api/products',
    changeOrigin: true,
  }),
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
