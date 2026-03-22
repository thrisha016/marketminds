const express = require('express');
const auth = require('./auth');
const products = require('./products');

const router = express.Router();

router.use('/auth', auth);
router.use('/products', products);

module.exports = router;