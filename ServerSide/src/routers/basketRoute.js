const express = require('express')
const basketRoute = express.Router()
const { getListBsket} = require ('../controllers/basketControllers')
const upload = require('../middleware/uploadMiddleware');
const { uploadImageToBasket } = require('../controllers/basketControllers');


basketRoute.get('/getBasket',getListBsket)
basketRoute.post('/upload', upload, uploadImageToBasket); 



// volunteersRoute.post('/log_in',log_in_user)
module.exports = basketRoute