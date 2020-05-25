const Product = require('../models/productModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Review = require('../models/reviewModel');
const multer = require('multer');
const upload = require('../upload');


exports.postProducts = async (req, res, next) => {
    try {
        let { name, category, price, numberAvailable } = req.body;
        if ( !name || !category || !price || !numberAvailable ) {
            res.status(403).json({
                status: 'fail',
                error: 'Incomplete details provided'
            })
        }

        let wholesaler = `${req.user.firstName} ${req.user.lastName}`;
        let wholesalerId = req.user._id;
        
        let categoryName = await Category.findOne({ name: category });
        let categoryId = categoryName._id;
        let image;

        if(req.file) {
            image = req.file.path;
        }

        let newProduct = new Product({ name, category, categoryId, wholesaler, wholesalerId, price, numberAvailable, image });
        let savedProduct = await newProduct.save();

        

        categoryName.products.push(savedProduct);
        let saveCategory = await categoryName.save();

        req.user.products.push(savedProduct);
        let saveWholesaler = await req.user.save();

        res.status(201).json({
            status: 'success',
            message: 'Product posted successfully',
            data: savedProduct
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


exports.viewProducts = async (req, res, next) => {
    try {
        let wholesalerId = req.user._id;
        let findProducts = await Product.find({ wholesalerId: wholesalerId })
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

exports.updateProducts = async(req, res, next) => {
    try {
        let wholesalerId = req.user._id;
        let productId = req.params.id;
        let { name, price, numberAvailable } = req.body;

        if(!name || !price || !numberAvailable) {
            res.status(403).json({
                status: 'fail',
                error: 'Incomplete details provided'
            })
        }

        let updateProduct = await Product.findByIdAndUpdate( productId, {
            name: name,
            price: price,
            numberAvailable: numberAvailable
        })

        res.status(201).json({
            status: 'success',
            data: updateProduct
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

exports.deleteProducts = async(req, res, next) => {
    try {
        let productId = req.params.id;
        let findProduct = await Product.findByIdAndDelete(productId);
        
        let findCategory = await Category.update(
            { _id: findProduct.categoryId },
            { $pull: { products: productId } },
            function(err, numberAffected) {
                if(err) console.log(err);
                // console.log(numberAffected.n);
            }
        )

        let findUser = await User.update(
            { _id: findProduct.wholesalerId },
            { $pull: { products: productId } },
            function(err, numberAffected) {
                if(err) console.log(err);
                // console.log(numberAffected.n);
            }
        )

        res.status(204).json({
            status: 'success',
            data: null
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

// exports.postProducts = async(req, res, next) => {
//     try {

//     }
//     catch(err) {
//         console.error(err);
//         if (err.name === 'ValidationError'){
//         const errors = Object.values(err.errors).map(el => el.message);
//         const error = errors[0];
//         res.status(500).json({
//             status: 'fail',
//             error: error
//             });
//         }
//         else{
//         console.log(err);
//         res.status(400).json({
//         status: 'fail',
//         error: err
//             })
//         }
//     }
//     next();
// };