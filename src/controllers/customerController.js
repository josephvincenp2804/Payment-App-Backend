const customerService = require('../services/customerService');

const getCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers
};
