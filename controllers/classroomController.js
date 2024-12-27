const Classroom = require('../models/classroomModels');
const School = require('../models/schoolsModels');

exports.createClassroom = async (req, res) => {
  try {
    const { schoolId, name, capacity, resources } = req.body;
    
    
    // Check if the school exists
    const school = await School.find({createdBy:req.user.createdBy});

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    const classroom = new Classroom({ name, capacity, resources, school: schoolId, createdBy: req.user.createdBy});
    await classroom.save();

    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  try {

    let classroom;
    if(req.user.schoolId && req.user.createdBy != null){
        classroom = await Classroom.find({ school: req.user.schoolId });
    
    }else{
        classroom = await Classroom.find({});
        
    }
    res.status(200).json({ success: true, data: classroom });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    console.log(req.body)
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    res.status(200).json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
