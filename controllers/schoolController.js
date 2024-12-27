const School = require('../models/schoolsModels')


exports.createSchool = async (req, res) => {
  try {
    const { name, address, contact } = req.body;

    // Check if all required fields are present
    if (!name || !address || !contact) {
      return res.status(400).json({ message: 'Name, address, and contact are required' });
    }

    // Only superadmin can create schools
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create and save the school
    const school = new School({
      name,
      address,
      contact,
      createdBy: req.user.id, 
    });

    await school.save();
    res.status(201).json(school); 
  } catch (error) {
    console.error('Error creating school:', error); 
    res.status(500).json({ message: error.message }); 
  }
};


exports.getSchool = async (req, res) => {
    try {
      console.log("Fetching all schools...");
  
      // Fetch all schools from the database
      const schools = await School.find();
  
      // If no schools are found
      if (!schools || schools.length === 0) {
        return res.status(404).json({ message: 'No schools found' });
      }
  
      // Return the list of schools
      res.status(200).json(schools);
    } catch (error) {
      console.error('Error fetching schools:', error); 
      res.status(500).json({ message: error.message }); 
    }
  };
  