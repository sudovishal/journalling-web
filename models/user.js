const mongoose = require('mongoose');
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
    },
    password : {
        type : String,
        required : true,
        },
    journals : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Journal'
        }]
    })
    module.exports = mongoose.model("User", userSchema)