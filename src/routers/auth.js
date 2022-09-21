const { authJWT } = require("../middlewares");
const express = require('express');
const router = express.Router();
const constroller= require('../controllers/authController')

router.post('/signup', constroller.createUser);
router.post('/login', [authJWT], constroller.login);

module.exports = router 