const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    age: {type : Number, require: true},
    grade: {type: String, require: true},
    school: {type: String, require: true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    schoolId:{type: String,  default: null}
})

module.exports = mongoose.model('Student', studentSchema)