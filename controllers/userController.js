const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Review = require('../models/reviewModel');

const filteredObj = (obj, ...allowedFields) =>{
    const newFields = {};
    Object.keys(obj).forEach(el =>{
        if(allowedFields.includes(el)){
            newFields[el] = obj[el]
        }
    });
    return newFields;
};

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

// exports.viewProduct = async (req, res, next) => {
//     try {
//         let productId = req.params.id;
//         // let findProduct = await Product.findById(productId);
//         // let populate = findProduct.populate('reviews').exec((err,result)=>{
//         //     if(err) console.log(err);
//         // })

//         Product.findById(productId).populate('reviews').exec((err,result)=>{
//             if(err) console.log(err);
//             res.send(result);
//         })

//         // if(findProduct) {
//         //     res.status(200).json({
//         //         status: 'success',
//         //         data: findProduct
//         //     })
//         // } else {
//         //     res.status(404).json({
//         //         status: 'fail',
//         //         error: 'Product not found'
//         //     })
//         // }
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

exports.viewProduct = (req,res,next) => {
    let productId = req.params.id;
    Product.findById(productId).populate('userReviews').exec((err,result)=>{
        if(err) console.log(err);
        if(result) {
            res.status(200).json({
                status: 'success',
                data: result
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Product not found'
            })
        }
    })
}

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

// exports.viewCategory = async (req, res, next) => {
//     try {
//         let categoryId = req.params.id;
//         let findCategory = await Category.findById(categoryId);
//         if(findCategory) {
//             res.status(200).json({
//                 status: 'success',
//                 data: findCategory
//             })
//         } else {
//             res.status(404).json({
//                 status: 'fail',
//                 error: 'Category not found'
//             })
//         }
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

exports.viewCategory = (req,res,next) => {
    let categoryId = req.params.id;
    Category.findById(categoryId).populate('products').exec((err,result)=>{
        // console.log(result);
        if(err) console.log(err);
        if(result) {
            res.status(200).json({
                status: 'success',
                data: result
        })
         } else {
            res.status(404).json({
                status: 'fail',
                error: 'Product not found'
            })
        }
    })
    // next();         
};

exports.deleteAccount = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let findUser = await User.findById(userId);
        if(findUser) {
            let deleteUser = await User.findByIdAndDelete(userId);
            res.clearCookie('jwt');
            res.status(204).json({
                status: 'success',
                data: null
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'User not found'
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
exports.updateMyAccount = async (req, res, next) =>{
    try{
        const filteredBody = filteredObj(req.body, 'email', 'firstName', 'lastName');
        const updateMyAccount = await User.findByIdAndUpdate({_id: req.user.id}, filteredBody, {
            new: true, 
            runValidators: true});
        res.status(200).json({
            Status: 'Success',
            user: updateMyAccount
        }); 
    }catch(err){
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
}


