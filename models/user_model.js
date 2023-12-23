const mongoose = require('mongoose');

// user Schema
const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});




// Modelling the Schema
const user_model = mongoose.model('users', userSchema);


module.exports = user_model;