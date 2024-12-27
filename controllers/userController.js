const User = require('../models/authUser');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent duplicate registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create User
exports.createUser = async (req, res) => {
    try {
      const { name, email, password, role, schoolId } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (role === 'schooladmin' && !schoolId) {
        return res.status(400).json({ message: 'School ID is required for schooladmin' });
      }
     console.log(">>>>>>>>>=======",req.user._id)
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
        email,
        password,
        role,
        schoolId: role === 'schooladmin' ? schoolId : null,
        createdBy: req.user._id,
      });
  
      await user.save();
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get All Users
  exports.getAllUsers = async (req, res) => {
    try {
      // Superadmin-specific filtering
      if (req.user.role === 'superadmin') {
        const users = await User.find({ 
          role: 'schooladmin', 
          createdBy: req.user.id 
        });
        return res.status(200).json(users);
      }
  
      // General case for other roles
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update User
  exports.updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
  
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete User
  exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };