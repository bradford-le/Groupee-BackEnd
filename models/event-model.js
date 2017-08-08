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
  members: {
    type: Array,
    default: []
  },
  state: {
    type: String,
    required: [true, 'The State is required']
  },
  payments: [{
    type: Schema.Types.ObjectId, ref: 'Payment'
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const groupeeEvent = mongoose.model('groupeeEvent', groupeeEventSchema);
module.exports = groupeeEvent;
