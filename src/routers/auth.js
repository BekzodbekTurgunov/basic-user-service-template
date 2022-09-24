const { authJWT, checkEMailExist } = require("../middlewares");
const express = require('express');
const router = express.Router();
const constroller= require('../controllers/authController')

router.post('/signup',[checkEMailExist], constroller.createUser);
router.post('/confirm-user', constroller.confirmUser)
router.post('/resend-verification', constroller.resendVerification)
router.post('/login', constroller.login);
router.post('/verify-token', constroller.verifyToken);

module.exports = router