const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');





exports.createCategory = async (req, res, next) => {
    try{
        let { name } = req.body;
        if(!name) {
            res.status(400).json({
                status: 'fail',
                error: 'Please provide category name'
            })
        }

        let categoryExists = await Category.findOne({ name });
        if(categoryExists) {
            res.status(403).json({
                status: 'fail',
                error: 'Category name already exists'
            })
        } else {
            let newCategory = new Category({ name });
            let saveCategory = await newCategory.save();
            res.status(201).json({
                status: 'success',
                message: 'Category created successfully',
                data: newCategory
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

exports.updateCategory = async (req, res , next) => {
    try {
        let categoryId = req.params.id;
        let { name } = req.body;
        if(!name) {
            res.status(403).json({
                status: 'fail',
                error: 'New category name needed'
            })
        };

        let updateCategory = await Category.findByIdAndUpdate( categoryId, { name: name });
        if(updateCategory) {
            res.status(201).json({
                status: 'success',
                message: 'Category name updated successfully',
                data: updateCategory
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

exports.deleteCategory = async(req, res, next) => {
    try {
        let categoryId = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(categoryId);
        if(deleteCategory) {
            res.status(204).json({
                status: 'success',
                data: null
            })
        } else {
            res.status(404).json({
                status: 'fail',
                error: 'Category not found'
            })
        }

        const deleteProducts = await Product.deleteMany({ category: categoryId});
        
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

exports.deactivateUser = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let deactivateUser = await User.findByIdAndUpdate( userId, { active: false });
        if(deactivateUser) {
            res.status(200).json({
                status: 'success',
                message: 'User deactivated successfully',
                data: deactivateUser
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

exports.viewAllConsumers = async (req, res, next) => {
    try {
        let findConsumers = await User.find({ role: 'consumer' });
        res.status(200).json({
            status: 'success',
            data: findConsumers
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

exports.viewConsumer = async (req, res, next) => {
    try {
        let consumerId = req.params.id;
        let findConsumer = await User.findById(consumerId);
        if(findConsumer) {
            res.status(200).json({
                status: 'success',
                data: findConsumer
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
exports.updateUserAccount = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true, runValidators: true});
        if(!user){
            res.status(400).json({
                Status: 'Fail',
                Error: 'Could not find requested user'
            })
        }
        res.status(200).json({
            Status: 'Success',
            Message: 'User Updated Successfully',
            data: user
        })
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
