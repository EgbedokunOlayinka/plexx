const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');
const User = require('./userModel');



const reviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    consumer: {
        type: Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },

    reviewBody: {
        type: String,
        required: true
    }
}, 

{timestamps: true}
);


module.exports = mongoose.model('Review', reviewSchema);


