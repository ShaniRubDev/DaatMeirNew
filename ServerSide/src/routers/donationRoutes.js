const express = require('express');
const routerDonation = express.Router();
const DonationController = require('../controllers/donationController');

// 🔹 יצירת תרומה חדשה
routerDonation.post('/save-donation', DonationController.saveDonations);

// 🔹 קבלת כל התרומות
routerDonation.get('/all', DonationController.getAllDonations);

// 🔹 קבלת תרומות לפי תורם מסוים
routerDonation.get('/donor/:donor_id', DonationController.getDonationsByDonor);

module.exports = routerDonation;
