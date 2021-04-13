const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');


const itemSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
    },
    name: String,
    category_id:{
        type: ObjectId,
        ref: 'Category'
    } ,
    date: {
        type: Number,
        default: new Date().getTime()
    },
    start_bid_date: {
        type: Number,
        default: new Date().getTime()
    },
    images: {
        data: Buffer,
        contentType: String
    },
    detail: String,
    price: Number,
    bidded: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

module.exports = mongoose.model('Item', itemSchema);