const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');
const User = require('./userModel');



const reviewSchema = new Schema({
    productName: {
        type: String
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    consumerName: {
        type: String
    },
    consumer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    reviewBody: {
        type: String,
        required: [true, 'Review body cannot be empty']
    }
}, 

{timestamps: true}
);


module.exports = mongoose.model('Review', reviewSchema);


