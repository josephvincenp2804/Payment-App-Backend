const paymentService = require('../services/paymentService');

const createPayment = async (req, res, next) => {
  try {
    const { account_number, payment_amount } = req.body;
    const payment = await paymentService.createPayment(account_number, payment_amount);

    res.status(201).json({
      success: true,
      message: 'Payment Successful',
      reference_number: `PAY-${payment.id}-${Date.now().toString().slice(-4)}` // Helper for a unique reference
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentHistory = async (req, res, next) => {
  try {
    const { account_number } = req.params;
    const payments = await paymentService.getPaymentsByAccountNumber(account_number);
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  getPaymentHistory
};
