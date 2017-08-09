'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'The username is required']
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  },
  // eventId: [{ type: Schema.Types.ObjectId, ref: 'groupeeEvent' }],
  // itemIds: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
