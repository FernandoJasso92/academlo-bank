const express = require('express');

//Controllers
const userController = require('../controllers/user.controller');

//Middleware
const userMiddleware = require('../middleware/user.middleware');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userMiddleware.validUser, userController.login);

module.exports = router;
