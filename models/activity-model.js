
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  host: {
    type: String,
    required: [true, 'The host is required']
  },
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  payments_paid: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number
  }],
  payments_recieved: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number
  }],
  members: [{
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    accepted: Boolean
  }],
  deadline: {
    type: Date,
    required: [true, 'The Deadline is required']
  },
  state: {
    type: String,
    required: [true, 'The State is required']
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
