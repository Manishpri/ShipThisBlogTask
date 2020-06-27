const userInfoController = require('./userInfoController');
const express            = require('express');
const Router             = express.Router();

Router.post('/create',userInfoController.userInfo);
Router.post('/login',userInfoController.login);

module.exports =Router