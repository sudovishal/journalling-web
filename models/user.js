const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    username : 
    {
        type : String,
        unique : true,
        required : [true,'cant be blank'],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true
    },
    password : {
        type : String,
        required : true
    }
    })
    module.exports = mongoose.model("User", userSchema)

    /*
    We need our usernames and emails to be unique between users so that users can't sign up with the same information. Mongoose doesn't have a built-in validation for unique fields,
    but fortunately, we can use the mongoose-unique-validator plugin to get this functionality.
    */