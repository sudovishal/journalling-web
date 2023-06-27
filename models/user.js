const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : async function (value) {
                const user = await this.constructor.findOne({email : value})
                return !user;
            },
            message : 'Email already exists',
        },
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format',
          },
    },
    password : {
        type : String,
        required : true,
        },
    })
    module.exports = mongoose.model("User", userSchema)