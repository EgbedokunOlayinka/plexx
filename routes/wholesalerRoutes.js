const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const wholesalerController = require('../controllers/wholesalerController');
const upload = require('../upload');


//POST HIS PRODUCTS
router.post('/wholesaler/products', upload.single('image'), authController.protectRoutes, authController.restrictTo("wholesaler") ,wholesalerController.postProducts);

//VIEW HIS PRODUCTS
router.get('/wholesaler/products', authController.protectRoutes, authController.restrictTo("wholesaler"), wholesalerController.viewProducts);

//UPDATE HIS PRODUCTS
router.put('/wholesaler/products/:id', authController.protectRoutes, authController.restrictTo("wholesaler"), wholesalerController.updateProducts);

//DELETE HIS PRODUCTS
router.delete('/wholesaler/products/:id', authController.protectRoutes,  authController.restrictTo("wholesaler"), wholesalerController.deleteProducts);






module.exports = router;