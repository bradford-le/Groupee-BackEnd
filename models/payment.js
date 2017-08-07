const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  id: Number,
  activityId: Number,
  sender: String,
  recevier: String,
  amount: String,
  isDone: Boolean
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Payment = mongoose.model('Payment',paymentSchema);
module.exports = Payment;