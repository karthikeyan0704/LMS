const Book = require('../models/Book');
const Student = require('../models/Student');
const Transaction = require('../models/Transaction');

exports.issueBook = async (req, res) => {
  try {
    const { bookId, studentId, dueDate } = req.body;
    if (!bookId || !studentId) return res.status(400).json({ message: 'bookId and studentId are required' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies < 1) return res.status(400).json({ message: 'No copies available' });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const transaction = new Transaction({
      book: book._id,
      student: student._id,
      issuedBy: req.user?.id,
      dueDate
    });
    await transaction.save();

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ message: 'Book issued', transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) return res.status(400).json({ message: 'transactionId is required' });

    const transaction = await Transaction.findById(transactionId).populate('book');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    if (transaction.returned) return res.status(400).json({ message: 'Book already returned' });

    transaction.returned = true;
    transaction.returnedAt = new Date();
    // optional: calculate fine here if overdue
    await transaction.save();

    const book = await Book.findById(transaction.book._id);
    book.availableCopies = (book.availableCopies || 0) + 1;
    await book.save();

    res.json({ message: 'Book returned', transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('book')
      .populate('student')
      .populate('issuedBy')
      .sort({ issuedAt: -1 });
    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};