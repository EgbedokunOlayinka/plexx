const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name'],
        uppercase: true
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name'],
        uppercase: true
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password should be more than eight characters'],
        select: false
    },

    phoneNumber: {
        type: Number,
    },

    businessLogo: {
        type: String    //in form of image url
    },

    shopAddress: {
        type: String
    },

    role: {
        type: String,
        enum: ['wholesaler', 'consumer'],
        default: 'consumer'
    },

    active: {
        type: Boolean,
        default: true,
        select: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    products: [
        { type: Schema.Types.ObjectId, 
            ref: 'Product' }
        ],

    cart: [
        { type: Schema.Types.ObjectId,
            ref: 'Product' }
        ],

    wishlist: [
        { type: Schema.Types.ObjectId, 
            ref: 'Product' }
        ],

    purchaseHistory: [
        { type: Schema.Types.ObjectId, 
            ref: 'Product' }
        ],
}, 
{timestamps: true}
);

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.pre(/^find/, function(next){
    this.find({ active: {$ne : false}})
    next();
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
};

const User =  mongoose.model('User', userSchema);
module.exports = User;


