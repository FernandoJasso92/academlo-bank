const Transfer = require('./../models/transfer.model');

class TransferService {
  async create(transferDate) {
    try {
      return await Transfer.create(transferDate);
    } catch (error) {
      throw new Error('Something went very wrong');
    }
  }
}

module.exports = TransferService;
