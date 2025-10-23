const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issuedAt: { type: Date, default: Date.now },
  dueDate: { type: Date }, // optional
  returned: { type: Boolean, default: false },
  returnedAt: { type: Date },
  fine: { type: Number, default: 0 }
});

module.exports = mongoose.model('Transaction', TransactionSchema);