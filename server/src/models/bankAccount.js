'use strict'
import {Schema, model} from 'mongoose';
const userSchema = new Schema({
    bankAccount:{
        type: Number, 
        unique: true, 
        required: true
    },
    balance:{
        type: Number, 
        required: true
    },
},
{
   timestamps: true,
   versionKey: false 
});

export default model('bankAccount', userSchema);