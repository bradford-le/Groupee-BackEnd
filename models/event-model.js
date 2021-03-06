'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupeeEventSchema = new Schema({
  host: {
    type: String,
    required: [true, 'The host is required']
  },
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  members: [{
    type: Schema.Types.ObjectId, ref: 'User',
    default: []
  }],
  items: [{
    type: Schema.Types.ObjectId, ref: 'Item',
    default: []
  }],
  state: {
    type: String,
    required: [true, 'The State is required']
  },
  payments: [{
    type: Schema.Types.ObjectId, ref: 'Payment'
  }],
  total: {
    type: Number
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const groupeeEvent = mongoose.model('groupeeEvent', groupeeEventSchema);
module.exports = groupeeEvent;
