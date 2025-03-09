
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getAllBaskets, uploadImage, saveBasket } = require('../models/basketModels')
// const uploadImage = require('../models/basketModels'); 

// const { isExist, saveRefreshToken } = require('../models/userModel')

async function getListBsket(req, res, next) {
    console.log("getListBasket")
    const basket = await getAllBaskets();
    if (basket) {
        console.log(basket)

        res.status(200).json({ basket: { basket } });
    }
    else {
        res.status(403).json({ message: "erorr" });
    }
}

// controllers/imageController.js


async function uploadImageToBasket(req, res) {
    try {
        // אם לא הועלתה תמונה
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }
        console.log("File uploaded:", req.file.filename);
        // קורא לפונקציה מהמודל לשמירה במסד הנתונים
        const imagePath = `/uploads/${req.file.filename}`;
     
     
        const { title, description, sum, freeAmount } = req.body;// מקבל פרטי הסל מהלקוח
        const newBasket = await uploadImage(title, description, sum, imagePath, freeAmount);; // קריאה למודל

        // מחזיר תשובה ללקוח
        res.status(201).json({ message: 'Image uploaded and basket saved successfully!', basket: newBasket });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: 'Server error' });
    }
}
async function addBasket(req, res) {
    try {
        console.log("Received data:", req.body);

        const { title, description, sum, freeAmount, image } = req.body;

        if (!title || !description || sum === undefined || freeAmount === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newbasket = await saveBasket(title, description, sum, freeAmount, image);

        res.status(201).json({ message: "Basket added successfully", basket: newbasket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }


}
console.log("Exporting from basketControllers:", {
    getListBsket,
    uploadImageToBasket,
    addBasket
});


module.exports = {
    getListBsket,
    uploadImageToBasket,
    addBasket
};

