'use strict'
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    //name:{type: String, required: true},
    email:{
        type: String, 
        unique: true, 
        required: true
    },
    encryptedPassword:{
        type: String, 
        required: true
    },
    role:{
            ref:'role',
            type: Schema.Types.ObjectId
        }
},
{
   timestamps: true,
   versionKey: false 
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('users', userSchema);