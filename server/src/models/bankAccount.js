'use strict'
import {Schema, model} from 'mongoose';
const userSchema = new Schema({
    //name:{type: String, required: true},
    bankAccount:{
        type: Number, 
        unique: true, 
        required: true
    },
    balance:{
        type: String, 
        required: true
    },
},
{
   timestamps: true,
   versionKey: false 
});

export default model('bankAccount', userSchema);