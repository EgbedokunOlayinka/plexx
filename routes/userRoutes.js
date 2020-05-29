const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// REGULAR USER SIGNUP ROUTE
router.post('/signup', authController.signUp);

//WHOLESALER SIGNUP ROUTE
router.post('/signup/wholesaler', authController.wholesalerSignUp);

// USER LOGIN TO THEIR ACCOUNT
router.post('/login', authController.login);

//VIEW ALL PRODUCTS
router.get('/products', userController.viewAllProducts);

//VIEW SPECIFIC PRODUCT
router.get('/products/:id', userController.viewProduct);

//VIEW ALL WHOLESALERS
router.get('/wholesalers', userController.viewAllWholesalers);

//VIEW SPECIFIC WHOLESALER
router.get('/wholesalers/:id', userController.viewWholesaler)

//VIEW ALL CATEGORIES
router.get('/categories', userController.viewAllCategories);

//VIEW SPECIFIC CATEGORY
router.get('/categories/:id', userController.viewCategory);

//DELETE ACCOUNT
router.delete('/users/:id', userController.deleteAccount);

//UPDATE ACCOUNT
router.put('/user/me', authController.protectRoutes, userController.updateMyAccount);



module.exports = router;