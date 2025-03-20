const express = require('express');
const announcementRoutes = express.Router();
const announcementController = require('../controllers/announcementController');

announcementRoutes.post('/create', announcementController.create);
announcementRoutes.get('/active', announcementController.getActive);
announcementRoutes.get('/all', announcementController.getAll);
announcementRoutes.put('/update-status', announcementController.updateStatus);
announcementRoutes.delete('/delete/:id', announcementController.remove);

module.exports = announcementRoutes;