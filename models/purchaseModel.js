const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./productModel');
const User = require('./userModel');


const purchaseSchema = new Schema({
    userAddress: {
        type: String,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

    productCount: {
        type: Array
    },

    totalCost: {
        type: Number,
        required: true
    },

    isDelivered: {
        type: Boolean,
        default: false
    }
}, 

{timestamps: true}
);


module.exports = mongoose.model('Purchase', purchaseSchema);


