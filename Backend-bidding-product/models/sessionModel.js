const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    _id: String,
    expires: String,
    session: String,
},
{ timestamp: true });




module.exports = mongoose.model('Session', sessionSchema);