
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {getAllBaskets , uploadImage} = require('../models/basketModels')
// const uploadImage = require('../models/basketModels'); 

// const { isExist, saveRefreshToken } = require('../models/userModel')

async function getListBsket(req, res, next){
    console.log("getListBasket")
    const basket = await getAllBaskets();
    if(basket){
        console.log(basket)

        res.status(200).json({basket:{basket}});
    }
    else{
        res.status(403).json({message:"erorr"});
    }
}

// controllers/imageController.js


async function uploadImageToBasket(req, res) {
    try {
        // אם לא הועלתה תמונה
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        // קורא לפונקציה מהמודל לשמירה במסד הנתונים
        const imagePath = `/uploads/${req.file.filename}`;
        const { name, description, sum } = req.body; // מקבל פרטי הסל מהלקוח
        await uploadImage(name, description, sum, imagePath); // קריאה למודל

        // מחזיר תשובה ללקוח
        res.status(200).json({ message: 'Image uploaded successfully!', imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getListBsket, uploadImageToBasket
}