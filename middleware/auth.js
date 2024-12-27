const jwt = require('jsonwebtoken');
const User = require('../models/authUser');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};



exports.superadminMiddleware = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access denied. Superadmin only.' });
    }
    next();
};
