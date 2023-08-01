const express = require('express');

//controllers
const transferController = require('../controllers/transfer.controller');

//middlewares
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', transferController.transfer);

module.exports = router;
