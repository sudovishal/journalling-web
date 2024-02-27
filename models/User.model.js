import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
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
const User = mongoose.model("User", userSchema)
export default User;
    // export default User = mongoose.model("User", userSchema)