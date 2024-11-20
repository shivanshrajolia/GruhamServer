const express = require('express');
const { subscribe, getSubscription } = require('../controllers/subscriptionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, subscribe);
router.get('/', authMiddleware, getSubscription);

module.exports = router;
