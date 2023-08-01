const User = require('../models/user.model');
const AppError = require('../utils/appError');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { accountNumber } = req.body;
  const user = await User.findOne({
    accountNumber,
    status: true,
  });
  if (!user)
    return next(
      new AppError(`user with accountNumber: ${accountNumber} not found`)
    );

  req.user = user;
  next();
});
