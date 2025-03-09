const express = require('express')
const basketRoute = express.Router()
const { getListBsket} = require ('../controllers/basketControllers')
const upload = require('../middleware/uploadMiddleware');
const { uploadImageToBasket} = require('../controllers/basketControllers');
 const { addBasket } = require('../controllers/basketControllers');
// const basketControllers = require('../controllers/basketControllers');
// console.log("basketControllers:", basketControllers);

basketRoute.get('/getBasket',getListBsket)
basketRoute.post('/upload',upload,uploadImageToBasket); 

basketRoute.post('/add', addBasket);
// basketRoute.post('/add', async (req, res) => {
//     try {
//         await addBasket(req, res);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });



// volunteersRoute.post('/log_in',log_in_user)
module.exports = basketRoute