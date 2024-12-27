const express = require('express');
const { register, login ,createUser,getAllUsers,updateUser,deleteUser} = require('../controllers/userController');
const {authMiddleware,superadminMiddleware} = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

router.post('/', authMiddleware, superadminMiddleware,createUser);
router.get('/', authMiddleware,superadminMiddleware, getAllUsers);
router.put('/:userId', authMiddleware,superadminMiddleware, updateUser);
router.delete('/:userId', authMiddleware,superadminMiddleware, deleteUser);

module.exports = router;
