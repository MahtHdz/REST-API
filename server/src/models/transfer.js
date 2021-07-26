'use strict'
import {Schema, model} from 'mongoose';

const Operations = Object.freeze({
    Transfer:'transfer',
    Deposit: 'deposit'
});

const operationSchema = new Schema({
    amount:{
        type: Number, 
        required: true
    },
    operationType:{
        type:String,
        enum: Object.values(Operations),
        required: true
    },
    originAccount: Number,
    destinationAccount:{
        type: Number, 
        required: true
    }
},
{
   timestamps: true,
   versionKey: false 
});

const operationModel = model('history', operationSchema);

export {Operations, operationModel};