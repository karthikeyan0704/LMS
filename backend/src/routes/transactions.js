// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const txController = require('../controllers/transactionController');

// // Protected endpoints
// router.post('/issue', auth, txController.issueBook);
// router.post('/return', auth, txController.returnBook);

// // List transactions (protected)
// router.get('/', auth, txController.listTransactions);

// module.exports = router;


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const txController = require('../controllers/transactionController');

// Issue and return should be performed by staff (admin or librarian)
router.post('/issue', auth, permit('admin', 'librarian'), txController.issueBook);
router.post('/return', auth, permit('admin', 'librarian'), txController.returnBook);

// List transactions only for staff (admins/librarians)
router.get('/', auth, permit('admin', 'librarian'), txController.listTransactions);

module.exports = router;