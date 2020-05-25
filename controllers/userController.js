const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Review = require('../models/reviewModel');


exports.viewAllProducts = async (req, res, next) => {
    try {
        let findProducts = await Product.find({});
        res.status(200).json({
            status: 'success',
            data: findProducts
        })
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewProduct = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let findProduct = await Product.findById(productId);
        if(findProduct) {
            res.status(200).json({
                status: 'success',
                data: findProduct
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Product not found'
            })
        }
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewAllWholesalers = async (req, res, next) => {
    try {
        let findWholesalers = await User.find({ role: 'wholesaler' });
        res.status(200).json({
            status: 'success',
            data: findWholesalers
        })
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewWholesaler = async (req, res, next) => {
    try {
        let wholesalerId = req.params.id;
        let findWholesaler = await User.findById(wholesalerId);
        if(findWholesaler) {
            res.status(200).json({
                status: 'success',
                data: findWholesaler
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Wholesaler not found'
            })
        }
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewAllCategories = async (req, res, next) => {
    try {
        let findCategories = await Category.find({});
        res.status(200).json({
            status: 'success',
            data: findCategories
        })
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewCategory = async (req, res, next) => {
    try {
        let categoryId = req.params.id;
        let findCategory = await Category.findById(categoryId);
        if(findCategory) {
            res.status(200).json({
                status: 'success',
                data: findCategory
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Category not found'
            })
        }
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.viewProductReviews = async (req, res, next) => {
    try {
        let productId = req.params.id;
        let findProduct = await Product.findById(productId);
        if(findProduct) {
            // findProduct
            // .populate('userReviews')
            // .exec((err,userReviews) => {
            //     if(err) console.log(err);
            //     res.status(200).json({
            //         status: 'success',
            //         data: userReviews
            //     })
            // })
            let findReviews = await Review.find({ product: productId });
            res.status(200).json({
                status: 'success',
                data: userReviews
            })

        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Product not found'
            })
        }
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};

exports.deactivateAccount = async (req, res, next) => {
    try {
        let userId = req.user._id;
        let findUser = await User.findByIdAndUpdate(userId, { active: false });
        if(findUser) {
            res.clearCookie('jwt');
            res.status(201).json({
                status: 'success',
                message: 'User deactivated successfully',
                data: req.user
            })
        }
    }
    catch(err) {
        console.error(err);
        if (err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(el => el.message);
        const error = errors[0];
        res.status(500).json({
            status: 'fail',
            error: error
            });
        }
        else{
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
            })
        }
    }
    next();
};



