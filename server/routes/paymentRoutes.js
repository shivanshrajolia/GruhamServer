const express = require('express');
const { createPaymentSession } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create-session', authMiddleware, createPaymentSession);

module.exports = router;
