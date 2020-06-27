const blogInfoController = require('./blogInfoController');
const express = require('express');
const Router = express.Router();
const uploadImage = require('../../middleware/upload');

Router.post('/create',uploadImage.single('image'),blogInfoController.create);
Router.get('/findAll',blogInfoController.findAll);
Router.put('/update/:_id',uploadImage.single('image'),blogInfoController.update);
Router.delete('/delete/:_id',blogInfoController.delete);

module.exports = Router