const { checkJwt }  = require('../middlewares/JWT');
const express = require('express');
const routes = express.Router();
const auth = require('./auth')

routes.post('/auth', auth);

module.exports = routes