const User = require('../models/userModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel')
const Category = require('../models/categoryModel');

exports.postProductReviews = async (req, res, next) =>{
    try{
        const product = await Product.findById({_id: req.params.productId});
        if(product == null){
            res.status(404).json({
                Status: 'Fail',
                Error: 'Product not found'
            })
        }
        const review = await Review.create({
            reviewBody: req.body.reviewBody,
            productName: product.name,
            product: product.id,
            consumerName: `${req.user.firstName} ${req.user.lastName}`,
            consumer: req.user.id
        })
        res.status(201).json({
            Status: 'Success',
            Message: 'Review posted successfully',
            data: review
        })
        const updateProduct = await Product.findByIdAndUpdate({_id: product.id}, {$push: {userReviews: review.id}}, 
            {new: true, useFindAndModify: false});
        console.log(updateProduct);

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
            res.status(400).json({
            status: 'fail',
            error: err
        })
        }
    }
};
exports.viewProductReviews = async (req, res, next) =>{
    try{
        const product = await Product.findById({_id: req.params.productId});
        const reviews = await Review.find({_id: product.userReviews});
        if(reviews.length === 0){
            res.status(404).json({
                Status: 'Fail',
                Message: 'There are no reviews for this product yet',
            })
        }
        res.status(200).json({
            Status: 'Success',
            result: reviews.length,
            data: {
                reviews
            }
        })
    }catch(err){
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};
exports.updateMyProductReview = async (req, res, next) =>{
    try{
        const user = await User.findById({_id: req.user.id});
        const review = await Review.findById({_id: req.params.reviewId});
        if(user.id == review.consumer){
        const myReview = await Review.findByIdAndUpdate({_id: req.params.reviewId}, {reviewBody: req.body.reviewBody}, 
            {new: true, useFindAndModify: false, runValidators: true});
        if(!myReview){
            res.status(400).json({
                Status: 'Fail',
                Error: 'Could not update review'
            })
        }
        return res.status(200).json({
                Status: 'Success',
                Message: ' Review Update Successfull',
                myReview
        })
    }
    res.status(401).json({
        Status: 'Fail',
        Error: 'You are not allowed to update another users review'
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};
exports.deleteMyProductreview = async (req, res, next)=>{
    try{
        const user = await User.findById({_id: req.user.id});
        const review = await Review.findById({_id: req.params.reviewId});
        if(user.id == review.consumer){
            const myReview = await Review.findByIdAndDelete({_id: req.params.reviewId});
            if(!myReview){
                res.status(400).json({
                    status: 'Fail',
                    Error: 'Could not find review'
                })
            }
            const product = await Product.findOneAndUpdate({userReviews: req.params.reviewId}, 
                {$pull: {userReviews: req.params.reviewId}}, {new: true, useFindAndModify: false});
                console.log(product);
            return      res.status(204).json({
                        Status: 'Success',
                        Message: 'Review deleted successfully'
            })
        }
        res.status(401).json({
            Status: 'Fail',
            Error: 'You are not authorized to delete another user review'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            Status: 'Fail',
            Error: 'Something went wrong'
        })
    }
};