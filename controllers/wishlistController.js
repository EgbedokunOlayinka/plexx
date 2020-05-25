const User = require('../models/userModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel')
const Category = require('../models/categoryModel');


exports.addProductToWishlist = async (req, res, next) =>{
    try{
        const product = await Product.findById({_id: req.params.productId});
        if(product){
            const user = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {wishlist: product.id}}, {new: true, useFindAndModify: false})
            res.status(200).json({
                Status: 'Success',
                Message: 'Product added successfully to cart',
                data:{
                    user
                }
            })
        }else{
        res.status(404).json({
            Status: 'Fail',
            Error: 'Product not found'
        })
        }
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};
exports.removeProductFromWishlist = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.user.id}, {$pull: {wishlist: req.params.productId}}, 
            {new: true, useFindAndModify: false});
        res.status(200).json({
            Status: 'Success',
            Message: 'Product removed from wishlist',
            data: user
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};
exports.clearWishlist = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.user.id}, {$set: {wishlist: []}}, {new: true, useFindAndModify: false})
        res.status(200).json({
            Status: 'Success',
            Message: 'Product removed successfully from wishlist',
            data: user
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'Wishlist could not be cleared'
        })
    }
};
exports.viewProductsInWishList = async (req, res, next) =>{
    try{
        const products = await Product.find({_id: req.user.wishlist});
        if(products.length === 0){
            res.status(400).json({
                Status: 'Fail',
                Error: 'You do not have any product in your wishlist'
            })
        }
        res.status(200).json({
            Status: 'Fail',
            result: products.length,
            data: {
                products
            }
        })
    }catch(err){

    }
};