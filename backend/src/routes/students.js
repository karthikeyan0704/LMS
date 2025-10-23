// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const studentController = require('../controllers/studentController');

// // Public: list and get
// router.get('/', studentController.listStudents);
// router.get('/:id', studentController.getStudent);

// // Protected: add/edit/delete
// router.post('/', auth, studentController.createStudent);
// router.put('/:id', auth, studentController.updateStudent);
// router.delete('/:id', auth, studentController.deleteStudent);

// module.exports = router;




const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const studentController = require('../controllers/studentController');

// Public: list and get
router.get('/', studentController.listStudents);
router.get('/:id', studentController.getStudent);

// Protected: add/edit/delete
// Create and update allowed for admin and librarian
router.post('/', auth, permit('admin', 'librarian'), studentController.createStudent);
router.put('/:id', auth, permit('admin', 'librarian'), studentController.updateStudent);

// Delete restricted to admin only
router.delete('/:id', auth, permit('admin'), studentController.deleteStudent);

module.exports = router;