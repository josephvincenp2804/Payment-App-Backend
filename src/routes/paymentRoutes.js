const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validatePaymentInput } = require('../middleware/validate');

router.post('/', validatePaymentInput, paymentController.createPayment);
router.get('/:account_number', paymentController.getPaymentHistory);

module.exports = router;
