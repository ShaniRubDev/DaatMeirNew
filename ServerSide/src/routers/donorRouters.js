const express = require('express');
const donorRoute = express.Router();
const donorController = require('../controllers/donorController');

// API לשמירת פרטי התורם
donorRoute.post('/save-donor', donorController.saveDonor);
donorRoute.get('/all',donorController.getAllDonars)

module.exports = donorRoute;
