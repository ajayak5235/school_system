const express = require('express');
const { createSchool, getSchool } = require('../controllers/schoolController');
const {authMiddleware, superadminMiddleware} = require('../middleware/auth');


const router = express.Router();
router.post('/', authMiddleware, superadminMiddleware, createSchool);
router.get('/', authMiddleware, superadminMiddleware, getSchool);

module.exports = router;