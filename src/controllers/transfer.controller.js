const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const UserService = require('../services/user.service');
const TransferService = require('../services/transfer.service');

const userService = new UserService();
const transferService = new TransferService();

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, accountNumberTransfer, accountNumberReceiver } = req.body;

  if (accountNumberTransfer === accountNumberReceiver) {
    return next(new AppError('You cannot transfer to yourself', 400));
  }
  const sendingUser = await userService.findOne(accountNumberTransfer);

  const receivingUser = await userService.findOne(accountNumberReceiver);

  if (sendingUser.id < amount) {
    return next(new AppError('Insufficient balance', 400));
  }

  const amountSendingUser = sendingUser.amount - amount;

  const amountReceivingUser = receivingUser.amount + amount;

  const updatedSendingUserPromise = userService.updateAmount(
    sendingUser,
    amountSendingUser
  );

  const updatedReceivingUserPromise = userService.updateAmount(
    receivingUser,
    amountReceivingUser
  );

  const transferPromise = transferService.create({
    amount,
    sendingUserId: sendingUser.id,
    receivingUserId: receivingUser.id,
  });

  await Promise.all([
    updatedSendingUserPromise,
    updatedReceivingUserPromise,
    transferPromise,
  ]);
  return res.status(201).json({
    status: 'success',
    message: 'Transfer successful',
  });
});
