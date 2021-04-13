const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')


const bidSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
    },
    item_id: {
        type: ObjectId,
        ref: 'Item'
    },
    date: {type: Number, default: new Date().getTime()},
    price: Number,
},
{ timestamp: true});


module.exports = mongoose.model('Bid', bidSchema);