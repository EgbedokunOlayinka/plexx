const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();



//CREATE CATEGORY
router.post('/categories', adminController.createCategory);

//UPDATE CATEGORY NAME
router.put('/categories/:id', adminController.updateCategory);


//DELETE CATEGORY
router.delete('/categories/:id', adminController.deleteCategory);

//DEACTIVATE USER
router.put('/users/:id', adminController.deactivateUser);

//VIEW ALL CONSUMERS
router.get('/consumers', adminController.viewAllConsumers);

//VIEW SPECIFIC CONSUMER
router.get('/consumers/:id', adminController.viewConsumer);

//UPDATE SPECIFIC USER ACCOUNT
router.patch('/user/:userId', 
                    authController.protectRoutes, 
                    authController.restrictToAdmin, 
                    adminController.updateUserAccount);


module.exports = router;