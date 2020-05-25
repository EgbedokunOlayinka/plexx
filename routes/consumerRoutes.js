const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');
const wishlistController = require('../controllers/wishlistController');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

//GET ALL PRODUCTS IN MY CART
router.get('/cart/me', authController.protectRoutes, cartController.viewAllproductsInCart);

//ADD PRODUCT TO MY CART
router.put('/cart/me/:productId', authController.protectRoutes, cartController.addProductToCart);

//DELETE ALL PRODUCT FROM MY CART i.e Clear cart
router.delete('/cart/me/products', authController.protectRoutes, cartController.removeAllProductsFromCart);

//REMOVE SPECIFIC PRODUCT FROM CART
router.delete('/cart/me/:productId', authController.protectRoutes, cartController.removeProductFromCart);

//GET A PRODUCTS IN MY WISHLIST
router.get('/wishlist/me', authController.protectRoutes, wishlistController.viewProductsInWishList);

//ADD A PRODUCT TO MY WISHLIST
router.put('/wishlist/me/:productId', authController.protectRoutes, wishlistController.addProductToWishlist);

//CLEAR ALL PRODUCTS FROM MY WISHLIST
router.delete('/wishlist/me/products', authController.protectRoutes, wishlistController.clearWishlist);

//REMOVE A SPECIFIC PRODUCT FROM MY WISHLIST
router.delete('/wishlist/me/:productId', authController.protectRoutes, wishlistController.removeProductFromWishlist);

//POST PRODUCT REVIEW
router.post('/product/:productId/review', authController.protectRoutes, reviewController.postProductReviews);

//VIEW ALL PRODUCT REVIEW 
router.get('/product/:productId/review', authController.protectRoutes, reviewController.viewProductReviews);

//UPDATE MY REVIEW
router.put('/product/:reviewId/review', authController.protectRoutes, reviewController.updateMyProductReview);

//DELETE MY REVIEW
router.delete('/product/:reviewId/review', authController.protectRoutes, reviewController.deleteMyProductreview);

module.exports = router