const prisma = require('../config/db');

class CustomerService {
  async getAllCustomers() {
    return await prisma.customer.findMany({
      orderBy: {
        account_number: 'asc'
      }
    });
  }

  async getCustomerByAccountNumber(accountNumber) {
    return await prisma.customer.findUnique({
      where: {
        account_number: accountNumber
      }
    });
  }
}

module.exports = new CustomerService();
