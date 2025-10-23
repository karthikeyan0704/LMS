// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const Book = require('../models/Book');
// const Student = require('../models/Student');
// const Transaction = require('../models/Transaction');

// // GET /api/dashboard - protected
// router.get('/', auth, async (req, res) => {
//   try {
//     const totalBooks = await Book.countDocuments();
//     const totalStudents = await Student.countDocuments();
//     const totalTransactions = await Transaction.countDocuments();
//     const totalIssued = await Transaction.countDocuments({ returned: false });
//     const totalReturned = await Transaction.countDocuments({ returned: true });

//     res.json({
//       totalBooks,
//       totalStudents,
//       totalTransactions,
//       totalIssued,
//       totalReturned
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const Book = require('../models/Book');
const Student = require('../models/Student');
const Transaction = require('../models/Transaction');

// GET /api/dashboard - protected: only admin and librarian
router.get('/', auth, permit('admin', 'librarian'), async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalIssued = await Transaction.countDocuments({ returned: false });
    const totalReturned = await Transaction.countDocuments({ returned: true });

    res.json({
      totalBooks,
      totalStudents,
      totalTransactions,
      totalIssued,
      totalReturned
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;