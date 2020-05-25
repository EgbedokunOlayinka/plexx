const User = require('../models/userModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel')
const Category = require('../models/categoryModel');

exports.addProductToCart = async (req, res, next) =>{
    try{
        const product = await Product.findById({_id: req.params.productId});
        const userCartItems = req.user.cart;
            if(product.numberAvailable === 0){
                res.status(400).json({
                    Status: 'Fail',
                    Error: 'Product is out of stock',
                })
            }
            if(userCartItems.includes(product.id)){
                return res.status(400).json({
                    Status: 'Fail',
                    Error: 'Product already added to cart',
                })
            }
            else{
                const user = await User.findByIdAndUpdate({_id: req.user.id}, {$push: {cart: product.id}}, {new: true, useFindAndModify: false});
            if(!user){
                res.status(400).json({
                    Status: 'Fail',
                    Error: 'product'
                })
            }
            res.status(200).json({
                Status: 'Success',
                Message: 'Product added to cart successfully',
                data: user
            }) 
            }
    }catch(err){
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
    }
};
exports.removeProductFromCart = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.user.id}, {$pull: {cart: req.params.productId}}, {new: true, useFindAndModify: false})
        res.status(200).json({
            Status: 'Fail',
            Message: 'Product removed successfully from cart',
            data: {
                user
            }
        })
    }catch(err){
        res.status(400).json({
            Status: 'Fail',
            Error: 'Problem occured while removing product from cart'
        })
    }
};
exports.removeAllProductsFromCart = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.user.id}, {$set: {cart: []}}, {new: true, useFindAndModify: false});
            res.status(200).json({
                Status: 'Success',
                Message: 'All Products removed successfully from cart',
                data: {
                    user
                }
            })
    }catch(err){
        console.log(err);
        res.status(400).json({
            Status: 'Fail',
            Error: 'Problem occured while removing all products from cart'
        })
    }
};
exports.viewAllproductsInCart = async (req, res, next) =>{
    try{
        const products = await Product.find({_id: req.user.cart})
        if(products.length = 0){
            res.status(404).json({
                Status: 'Fail',
                Error: 'There are no products in your cart'
            })
        }
        res.status(200).json({
            Status: 'Success',
            Result: products.length,
            data: {
                products
            }
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};


