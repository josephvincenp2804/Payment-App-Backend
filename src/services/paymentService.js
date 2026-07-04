const prisma = require('../config/db');

class PaymentService {
  async createPayment(accountNumber, paymentAmount) {
    // 1. Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: {
        account_number: accountNumber
      }
    });

    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Store the payment
    const payment = await prisma.payment.create({
      data: {
        customer_id: customer.id,
        payment_amount: Number(paymentAmount),
        status: 'SUCCESS'
      }
    });

    return payment;
  }

  async getPaymentsByAccountNumber(accountNumber) {
    // 1. Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: {
        account_number: accountNumber
      }
    });

    if (!customer) {
      const error = new Error('Customer not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Return payment list
    return await prisma.payment.findMany({
      where: {
        customer_id: customer.id
      },
      orderBy: {
        payment_date: 'desc'
      }
    });
  }
}

module.exports = new PaymentService();
