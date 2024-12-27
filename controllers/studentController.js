const Student = require('../models/studentModels');
const School = require('../models/schoolsModels');


exports.enrollStudent = async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    
    // Verify school existence
    const school = await School.find({createdBy: req.user.createdBy});
    
    const schoolName  = school.map(s => s.name) 
    const lastName = schoolName.length
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    const student = new Student({ name, age, grade, school: schoolName[lastName-1], createdBy: req.user.createdBy, schoolId:req.user.schoolId });
    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    let students;
    
    if(req.user.schoolId && req.user.createdBy){
        students = await Student.find({schoolId:req.user.schoolId});
    }else{
        students = await Student.find({}) 
    }
    
    
    res.status(200).json({success: true, data: students});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {

    try {
        const classroom = await Student.findByIdAndDelete(req.params.id);
        if (!classroom) {
          return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

