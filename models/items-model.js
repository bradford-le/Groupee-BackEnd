'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    eventid: {
        type: Schema.Types.ObjectId, ref: 'groupeeEvent',
    },
    userid: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    username: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
