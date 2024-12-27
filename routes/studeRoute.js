const express = require('express');
const {
  enrollStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const {authMiddleware} = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, enrollStudent);
router.get('/', authMiddleware, getStudents);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;
