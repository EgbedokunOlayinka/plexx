const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

// Regular User signup route
router.post('/signup', authController.signUp);
//Wholesaler signup route
router.post('/signup/wholesaler', authController.wholesalerSignUp);
// User login to their account
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

//VIEW PRODUCT REVIEWS
router.get('/products/:id/reviews', userController.viewProductReviews);

//DELETE ACCOUNT
router.put('/users', authController.protectRoutes, userController.deactivateAccount);




module.exports = router;