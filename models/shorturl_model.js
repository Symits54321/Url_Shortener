const mongoose = require('mongoose');

// shorturl Schema
const shorturlSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
        
      },

    longurl: {
        type: String,
        required: true
    },

    hashcode: {
        type: String,
        required: true
    },

    shorturl: {
        type: String,
        required: true
    }

 
},{
    timestamps: true
});




// Modelling the Schema
const shorturl_model = mongoose.model('shorturls', shorturlSchema);


module.exports = shorturl_model;