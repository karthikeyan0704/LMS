// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const bookController = require('../controllers/bookController');

// // Public: list and get
// router.get('/', bookController.listBooks);
// router.get('/:id', bookController.getBook);

// // Protected: add/edit/delete
// router.post('/', auth, bookController.createBook);
// router.put('/:id', auth, bookController.updateBook);
// router.delete('/:id', auth, bookController.deleteBook);

// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const bookController = require('../controllers/bookController');

// Public: list and get
router.get('/', bookController.listBooks);
router.get('/:id', bookController.getBook);

// Protected: add/edit/delete
// Create and update allowed for admin and librarian
router.post('/', auth, permit('admin', 'librarian'), bookController.createBook);
router.put('/:id', auth, permit('admin', 'librarian'), bookController.updateBook);

// Delete restricted to admin only
router.delete('/:id', auth, permit('admin'), bookController.deleteBook);

module.exports = router;