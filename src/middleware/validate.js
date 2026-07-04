const validatePaymentInput = (req, res, next) => {
  const { account_number, payment_amount } = req.body;

  // Check if account number is empty
  if (!account_number || account_number.toString().trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Account number is required'
    });
  }

  // Check if amount is invalid (not a number or not provided)
  if (payment_amount === undefined || payment_amount === null || isNaN(Number(payment_amount))) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment amount'
    });
  }

  const amount = Number(payment_amount);

  // Check if payment amount is negative or zero
  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Payment amount must be greater than zero'
    });
  }

  next();
};

module.exports = {
  validatePaymentInput
};
