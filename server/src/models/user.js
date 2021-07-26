'use strict'
import mongooseAutoPopulate from 'mongoose-autopopulate';
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    email:{
        type: String, 
        unique: true, 
        required: true
    },
    encryptedPassword:{
        type: String, 
        required: true
    },
    bankAccount: {
        ref:'bankAccount',
        type: Schema.Types.ObjectId,
        required: true,
        autopopulate: true
    },
    role:{
        ref:'role',
        type: Schema.Types.ObjectId,
        required: true,
        autopopulate: true
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

userSchema.plugin(mongooseAutoPopulate);
export default model('users', userSchema);