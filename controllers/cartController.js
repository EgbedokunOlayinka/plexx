const User = require('../models/userModel');
const Product = require('../models/productModel');
const Review = require('../models/reviewModel')
const Category = require('../models/categoryModel');
const Purchase = require('../models/purchaseModel');

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
            Status: 'Success',
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
        if(products.length === 0){
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

exports.checkout = async(req,res,next) => {
    try {
        let numberOfProducts = (Object.keys(req.body).length)-2;
        let userId = req.user._id;
        let userAddress = req.body.userAddress;
        let totalCost = req.body.totalCost;

        let arr = Object.values(req.body);
        let newArr = [];
        arr.forEach(el => {
            if(el.startsWith('[')) newArr.push(el);
        });

        let productArr = [];
        newArr.forEach((el, index)=>{
            let removeFirst = el.slice(1);
            let removeLast = removeFirst.slice(0, removeFirst.length-1);
            productArr.push(removeLast);
        })

        let productsArr = [];
        productArr.forEach((el, index) => {
            let split = el.split(',');
            productsArr.push(split);
        })
        
        let products = [];
        let productCount = [];
        productsArr.forEach((el,index) => {
            products.push(el[0]);
            productCount.push(el[1]);
        })

        let newPurchase = new Purchase ({
            userAddress,
            userId,
            totalCost 
        });
        let savedPurchase = await newPurchase.save();


        for(let i=0; i<products.length; i++) {
            let findProduct = await Product.findById(products[i]);

            if(findProduct.numberAvailable === 0) {
                let deletePurchase = await Purchase.findByIdAndDelete({_id: savedPurchase._id});
                res.status(403).json({
                    status: 'fail',
                    error: 'Product is out of stock. Check back later'
                })
            }

            if(findProduct.numberAvailable < (+productCount[i])) {
                let deletePurchase = await Purchase.findByIdAndDelete({_id: savedPurchase._id})
                res.status(403).json({
                    status: 'fail',
                    error: 'Product not enough. Please reduce your order'
                })
            } else {
                let updatePurchaseProduct = await Purchase.findOneAndUpdate({_id: savedPurchase._id}, {$push: {products: products[i]}}, {new: true, useFindAndModify: false});

                let updatePurchaseCount = await Purchase.findOneAndUpdate({_id: savedPurchase._id}, {$push: {productCount: (+productCount[i])}}, {new: true, useFindAndModify: false});

                let updateProductCount = await Product.findOneAndUpdate(
                    {_id: products[i]},
                    {numberAvailable: (+findProduct.numberAvailable) - (+productCount[i])  }
                );

                let updateHistory =  await User.findOneAndUpdate({_id: req.user._id}, {$push: {purchaseHistory: savedPurchase._id}}, {new: true, useFindAndModify: false});

            }
        }

        let resultPurchase = await Purchase.findById(savedPurchase._id);

        res.status(201).json({
            status: 'success',
            data: resultPurchase
        })
        

    }
    catch(err) {
        console.log(err);
        res.status(400).json({
        status: 'fail',
        error: err
        })
    }
};

exports.viewPurchases =  (req, res, next) => {
        let userId = req.user._id;
        User.findById(userId)
        .populate('purchaseHistory')
        .exec((err, result) => {
            if(err) console.log(err);
            if(result) {
                res.status(200).json({
                    status: 'success',
                    data: result
                })
            } else {
                res.status(404).json({
                    status: 'fail',
                    error: 'User not found'
                })
            }
        })
  
}



