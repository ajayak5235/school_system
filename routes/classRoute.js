const express = require('express');
const {
  createClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,
} = require('../controllers/classroomController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createClassroom);
router.get('/', authMiddleware, getClassrooms);
router.put('/:id', authMiddleware, updateClassroom);
router.delete('/:id', authMiddleware, deleteClassroom);

module.exports = router;
