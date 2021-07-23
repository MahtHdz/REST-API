'use strict'
import {Schema, model} from 'mongoose';
const userSchema = new Schema({
    //name:{type: String, required: true},
    amount:{
        type: Number, 
        required: true
    },
    transferType:{
        type:String,
        required: true
    },
    originAccount:{
        type: Number, 
        required: true
    },
    destinationAccount:{
        type: Number, 
        required: true
    }
},
{
   timestamps: true,
   versionKey: false 
});

export default model('history', userSchema);