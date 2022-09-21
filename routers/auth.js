const { checkJwt }  = require('../middlewares/JWT');
const express = require('express');
const routes = express.Router();
const {createUser, login}= require('../controllers/authController')

routes.post('/signup', createUser);
routes.post('/singin', login);

module.exports = routes 