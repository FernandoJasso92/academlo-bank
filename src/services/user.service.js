const User = require('../models/user.model');
const AppError = require('../utils/appError');

class UserService {
  async findOne(accountNumber) {
    try {
      const user = await User.findOne({
        where: {
          accountNumber,
          status: true,
        },
      });
      if (!user) {
        throw new AppError(
          `User with accountNumber: ${accountNumber} not found`,
          404
        );
      }
      return user;
    } catch (error) {
      throw new Error('Something went very wrong');
    }
  }

  async updateAmount(user, amount) {
    try {
      return await user.update({ amount });
    } catch (error) {
      throw new Error('Something went very wrong');
    }
  }
}

module.exports = UserService;
